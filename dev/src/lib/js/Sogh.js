import moment from 'moment';

import * as query from './GraphQL.js';
import GithubApiV3 from './GithubApiV3.js';
import GithubApiV4 from './GithubApiV4.js';

import Gtd from './Gtd.js';
import Scrum from './Scrum.js';
import ProductBacklogs from './ProductBacklogs.js';
import ProductBacklog from './ProductBacklog.js';
import Pool from './Pool.js';

const POOL = new Pool();

function owner (repo) {
    if ("string" === (typeof repo.owner))
        return repo.owner;

    return repo.owner.login;
}

class Issue {
    constructor (data) {
        this._data = data;
    }
    getPointResultsFromBody (body) {
        const rs = /\$Point.[R|r]esult:*\s+(\S+)\s+(\d+-\d+-\d+)\s+(\d+)/g;
        const regex = new RegExp(rs);

        const result = [...body.matchAll(regex)];

        if (result.length===0)
            return null;

        return result.reduce((ht, d)=>{
            const parson = d[1];
            const date = d[2];
            const point = d[3] *1;

            ht.total += point;
            ht.details.push({parson: parson, date: date, point: point});

            return ht;
        }, { total: 0, details: [] });
    }
    getPointFromBody (body) {
        const plan = /.*[@|$]Point\.Plan:*\s+(\d+).*/.exec(body);
        const result = /.*[@|$]Point\.Result:*\s+(\d+).*/.exec(body);
        const results = this.getPointResultsFromBody(body);

        return {
            plan:   plan ? plan[1] * 1 : null,
            result: result ? result[1] * 1 : null,
            results : results,
        };
    }
    getDueDateFromBody (body) {
        const a = /.*[@|$]Date\.Due:*\s+(\d+-\d+-\d+).*/.exec(body);

        if (a) return a[1];

        const b = /.*[@|$]Due\.Date:*\s+(\d+-\d+-\d+).*/.exec(body);

        if (b) return b[1];

        return null;
    };
    getNextActionFromBody (body) {
        const next_action = /.*[@|$]Date\.Next:*\s+(\d+-\d+-\d+).*/.exec(body);
        return next_action ? next_action[1] : null;;
    }
    getOwnerFromBody (body) {
        const owner = /.*\$[O|o]wner:\s+(\S+).*/.exec(body);
        return owner ? owner[1] : null;
    }
    addAnotetionValue (issue) {
        issue.point = this.getPointFromBody(issue.body);
        issue.due_date = this.getDueDateFromBody(issue.body);
        issue.date_next_action = this.getNextActionFromBody(issue.body);
        issue.owner = this.getOwnerFromBody(issue.body);

        return issue;
    }
}

export default class Sogh {
    constructor (token, options) {
        this._token = null;

        this._viewer = null;

        this.api = {
            v3: null,
            v4: null,
        };

        // TODO: options.labels で受け取る。
        this._labels = {
            meeging: null,
            waiting: null,
            release: null,
        };

        this._data = {
            viwer: {
                issues: {
                    pool: {ht:{}, list:[]},
                    fetch: {start: null, end: null},
                }
            },
            repositories: {},
            active: {
                repository: null,
                milestones: {ht:{}, list:[]},
                projects: {ht:{}, list:[]},
                labels: {ht:{}, list:[]},
                assignees: {ht:{}, list:[]},
            }
        };

        this.tools ={
            issue: new Issue(),
        };
    }
    connect (token, success, error) {
        const api = new GithubApiV4(token);

        api.fetch(query.viwer, (results) => {
            const data = results.data;

            this._token = token;

            this._viewer = data.viewer;
            this.api.v3 = new GithubApiV3(this._token);
            this.api.v4 = api;

            success(this);
        }, (r) => {
            this._token = token;
            this._viewer = null;
            this.api.v3 = null;
            this.api.v4 = null;

            error(r);
        });
    }
    ensureEndCursor(query, endCursor) {
        if (endCursor)
            return query.replace('after: "",', `after: "${endCursor}",`);

        return query.replace('after: "",', '');
    }
    addAnotetionValue4Issue (issue) {
        return this.tools.issue.addAnotetionValue(issue);
    }
    addAnotetionValue4Project (project) {
        const priority = (p) => {
            const ret = /.*@Priority:\s+([c|h|n|l]).*/.exec(p.body);

            // Critical :  最高の優先度のユーザー・ジョブ。
            // High : 高い優先度のユーザー・ジョブ。
            // Normal : 通常の優先度のユーザー・ジョブ。
            // Low : 低い優先度のユーザー・ジョブ。

            if (!ret)
                return 'l';

            return ret[1];
        };

        const assignee = (p) => {
            const ret = /.*@assignee:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const schedulePlan = (p) => {
            const ret = /.*@Plan:(\s+\d+-\d+-\d+),\s+(\d+-\d+-\d+).*/.exec(p.body);

            if (!ret)
                return { start: null, end: null };

            return { start: moment(ret[1]), end: moment(ret[2]) };
        };

        const scheduleResult = (p) => {
            const ret = /.*@Result:(\s+\d+-\d+-\d+),\s+(\d+-\d+-\d+).*/.exec(p.body);

            if (!ret)
                return { start: null, end: null };

            return { start: moment(ret[1]), end: moment(ret[2]) };
        };

        const type = (p) => {
            const ret = /.*@Type:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        project.title = project.name;
        project.type = type(project);

        project.plan = schedulePlan(project);
        project.result = scheduleResult(project);

        project.priority = priority(project);

        project.assignee = assignee(project);

        return project;
    }
    getIssuesByMilestone (milestone, cb) {
        if (!this.api.v4._token)
            cb([]);

        if (!milestone) return;

        const api = this.api.v4;

        const base_query = query.issues_by_milestone
              .replace('@milestone-id', milestone.id);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.node.issues;
                const page_info = data.pageInfo;

                for(const d of data.nodes)
                    issues.push(this.addAnotetionValue4Issue(d));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(issues);
            });
        };

        getter();
    }
    getIssuesByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_by_repository
              .replace('@owner', repository.owner)
              .replace('@name', repository.name);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.issues;
                const page_info = data.pageInfo;

                for(const d of data.nodes)
                    issues.push(this.addAnotetionValue4Issue(d));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(issues);
            });
        };

        getter();
    }
    getIssuesOpenByRepository (repository, viewer, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        this._data.viwer.issues.fetch.start = new Date();
        this._data.viwer.issues.fetch.end = null;

        const api = this.api.v4;

        const base_query = query.issues_open_by_repository
              .replace('@owner', repository.owner)
              .replace('@name', repository.name);

        const isViewer = (issue) => {
            return issue.assignees.nodes.find(d=>d.id===viewer.id);
        };

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.issues;
                const page_info = data.pageInfo;

                for(const issue of data.nodes)
                    if (isViewer(issue))
                        issues.push(this.addAnotetionValue4Issue(issue));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else {
                    this._data.viwer.issues.fetch.end = new Date();

                    this._data.viwer.issues.pool.list = issues;

                    cb(issues);
                }
            });
        };

        getter();
    }
    getIssuesOpenByLabel (repository, label_name, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_open_by_label
              .replace('@owner', repository.owner)
              .replace('@name', repository.name)
              .replace('@label_name', label_name);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.label.issues;
                const page_info = data.pageInfo;

                for(const issue of data.nodes)
                    issues.push(this.addAnotetionValue4Issue(issue));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(issues);
            });
        };

        getter();
    }
    getIssuesByReportLabel (repository, cb) {
        if (!this.api.v4._token)
            cb([]);

        if (!repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_by_report_label
              .replace('@owner', repository.owner)
              .replace('@name', repository.name);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const label = results.data.repository.label;

                if (!label)
                    return cb([]);

                const data = label.issues;
                const page_info = data.pageInfo;

                for(const d of data.nodes)
                    issues.push(this.addAnotetionValue4Issue(d));

                if (page_info.hasNextPage)
                    return getter(page_info.endCursor);
                else
                    return cb(issues);
            });
        };

        getter();
    }
    getIssuesByRepositoryProject (repository, project, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_by_repository
              .replace('issues(after: "", first: 100)', 'issues(after: "", first: 100, states: OPEN)')
              .replace('@owner', repository.owner)
              .replace('@name', repository.name);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.issues;
                const page_info = data.pageInfo;

                const isTarget = (cards) => {
                    for (const card of cards) {
                        if (card.column.project.id===project.id)
                            return true;
                    }

                    return false;
                };

                data.nodes.reduce((list, d) => {
                    if (isTarget(d.projectCards.nodes))
                        list.push(this.addAnotetionValue4Issue(d));

                    return list;
                }, issues);

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(issues);
            });
        };

        getter();
    }
    getIssuesByViwer (cb) {
        if (!this.api.v4._token)
            return cb([]);

        this._data.viwer.issues.fetch.start = new Date();
        this._data.viwer.issues.fetch.end = null;

        const api = this.api.v4;

        const base_query = query.issues_by_viwer;

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.viewer.issues;
                const page_info = data.pageInfo;

                for(const d of data.nodes)
                    issues.push(this.addAnotetionValue4Issue(d));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else {
                    this._data.viwer.issues.fetch.end = new Date();

                    this._data.viwer.issues.pool.list = issues;

                    cb(issues);
                }
            });
        };

        getter();

        return this;
    }
    getIssuesByProjectColumn (column, cb) {
        if (!this.api.v4._token)
            cb([]);

        if (!column)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_open_by_project_column
              .replace('@column-id', column.id);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const cards = results.data.node.cards;

                if (!cards)
                    return cb([]);

                cards.edges.reduce((list, d) => {
                    const issue = d.node.content;

                    if (issue && issue.id)
                        list.push(this.addAnotetionValue4Issue(issue));

                    return list;
                }, issues);

                const page_info = cards.pageInfo;

                if (page_info.hasNextPage)
                    return getter(page_info.endCursor);
                else
                    return cb(issues);
            });
        };

        getter();
    }
    getMilestonesByRepository (repository, cb) {
        if (!this.api.v4._token)
            cb([]);

        const api = this.api.v4;

        const base_query = query.milestone_by_reposigory
              .replace('@owner', owner(repository))
              .replace('@name',  repository.name);

        let milestones = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.milestones;
                const page_info = data.pageInfo;

                milestones = milestones.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(milestones);
                }
            });
        };

        getter();
    }
    getProjectsByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.projects_by_repository
              .replace('@owner', owner(repository))
              .replace('@name', repository.name);

        let projects = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.projects;
                const page_info = data.pageInfo;

                projects = projects.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(projects.map(this.addAnotetionValue4Project));
                }
            });
        };

        getter();
    }
    getAssigneesByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.assignees_by_repository
              .replace('@owner', owner(repository))
              .replace('@name', repository.name);

        let assignees = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.assignableUsers;
                const page_info = data.pageInfo;

                assignees = assignees.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(assignees.map(this.addAnotetionValue4Project));
                }
            });
        };

        getter();
    }
    getLabelsByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.labels_by_repository
              .replace('@owner', owner(repository))
              .replace('@name', repository.name);

        let labels = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.labels;
                const page_info = data.pageInfo;

                labels = labels.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(labels.map(this.addAnotetionValue4Project));
                }
            });
        };

        getter();
    }
    getProjectByID (id, cb) {
        if (!this.api.v4._token || !id)
            cb(null);

        const api = this.api.v4;

        const base_query = query.project_by_id
              .replace('@id', id);

        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                cb(this.addAnotetionValue4Project({...results.data.node}));
            });
        };

        getter();
    }
    makeGraphQLDataItem (v) {
        if ("string"===(typeof v))
            return JSON.stringify(v);

        if (Array.isArray(v))
            return '[' + v.map(d => this.makeGraphQLDataItem(d)).join(', ') + ']';

        return v;
    }
    makeGraphQLData (data) {
        const x = Object.keys(data).map(key => {
            const val = data[key];

            if (val===null
                || (Array.isArray(val) && val.length===0))
                return null;

            return key + ': ' + this.makeGraphQLDataItem(data[key]);
        });

        return '{ ' + x.filter(d=>d!==null).join(', ') + ' }';
    }
    // Create Issue
    makeIssueData () {
        return {
            repository: null,
            title: '',
            description: '',
            projects: [],
            milestone: null,
            labels: [],
            assignees: [],
        };
    }
    issueData2requestData (data) {
        const ids = (l) => l.map(d=>d.id);

        return {
            repositoryId: data.repository.id,
            title:        data.title,
            body:         data.description,
            projectIds:   ids(data.projects),
            milestoneId:  data.milestone ? data.milestone.id : null,
            labelIds:     ids(data.labels),
            assigneeIds:  ids(data.assignees),
        };
    }
    createIssue (data, cb_success, cb_error) {
        if (!this.api.v4._token || !data)
            cb_success(null);

        const api = this.api.v4;

        const q = query.create_issue
              .replace('@issue-data', this.makeGraphQLData(data));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    // from core
    getRepository (owner, name) {
        const repos = this._data.repositories;

        if (!repos[owner]) return null;

        if (!repos[owner][name]) return null;

        return repos[owner][name].data;
    }
    fetchRepository (owner, name, cb) {
        if (!this.api.v4._token || !owner || !name)
            cb(null);

        const api = this.api.v4;

        const base_query = query.repository
              .replace('@owner', owner)
              .replace('@name', name);

        const addReop = (success, data) => {
            const repos = this._data.repositories;

            if (!repos[owner])
                repos[owner] = {};

            repos[owner][name] = {
                data: success ? data : null,
                valid: success,
                error: success ? null : data,
            };
        };

        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                if (results.errors)
                    addReop(false, results.errors);
                else
                    addReop(true, results.data.repository);

                if (cb) cb(!results.errors);
            });
        };

        getter();
    }
    // active
    active () {
        return this._data.active;
    }
    activeRepository (repo) {
        if (arguments.length > 0) {
            this._data.active = {
                repository: repo,
                projects:   {ht:{}, list:[]},
                milestones: {ht:{}, list:[]},
                assignees:  {ht:{}, list:[]},
                labels:     {ht:{}, list:[]},
            };

            const active = this._data.active;
            this.getMilestonesByRepository(repo, (l)=> active.milestones = POOL.list2Pool(l));
            this.getProjectsByRepository(repo,   (l)=> active.projects   = POOL.list2Pool(l));
            this.getAssigneesByRepository(repo,  (l)=> active.assignees  = POOL.list2Pool(l));
            this.getLabelsByRepository(repo,     (l)=> active.labels     = POOL.list2Pool(l));
        }

        return this._data.active.repository;
    }
    // from core
    addPool (data, pool) {
        if (pool.ht[data.id])
            return;

        data.issues = [];

        pool.ht[data.id] = data;
        pool.list.push(data);
    }
    issues2projects (issues) {
        const pool = { ht:{}, list: [] };
        const empyProject = () => {
            return {
                id: null,
                body: null,
                closedAt: null,
                createdAt: null,
                name: null,
                updatedAt: null,
                url: null,
                issues: [],
                priority: 'l',
            };
        };

        for (const issue of issues) {
            if (issue.projectCards.nodes.length===0) {
                const project = empyProject();

                this.addPool(project, pool);

                pool.ht[project.id].issues.push(issue);
            } else {
                if (!issue.projectCards.nodes[0].column)
                    continue;

                const project = this.addAnotetionValue4Project(issue.projectCards.nodes[0].column.project);

                this.addPool(project, pool);

                pool.ht[project.id].issues.push(issue);
            }
        }

        return pool;
    }
    issues2dueDates (issues) {
        const ht = {};
        const list = [];

        const dd = (v) => {
            if (!v)
                return null;

            const m = moment(v);

            if (!m.isValid())
                return null;

            return m.format('YYYY-MM-DD');
        };

        for (const issue of issues) {
            const key = dd(issue.closedAt || issue.due_date);

            if (!ht[key])
                ht[key] = [];

            ht[key].push(issue);
            list.push(issue);
        }

        return { list: list, ht: ht };
    }
    pointFromIssueBody (v) {
        const ret = /.*@Point:\s+(\d+).*/.exec(v);

        if (!ret) return '';

        return ret[1] * 1;
    }
    // ui utility
    priorityLabel (code) {
        const m = {
            c: '急',
            h: '高',
            n: '普',
            l: '低',
        };
        const label = m[code];
        if (!label)
            return '??';

        return label;
    }
    getFilterPriorities (projects) {
        const ht = {};

        for (const project of projects) {
            if (!ht[project.priority])
                ht[project.priority] = 1;
            else
                ht[project.priority] += 1;
        }

        const list = ['c', 'h', 'n', 'l'];
        const out = [];
        for (const k of list)
            if (k in ht)
                out.push({ code: k, count: ht[k] });

        return out;
    }
    defaultCardSize (project) {
        const m = {
            c: 'max',
            h: 'large',
            n: 'medium',
            l: 'small',
        };

        const p = m[project.priority];

        if (!p)
            return 'medium';

        return p;
    }
    calCardSize (size) {
        const columns = {
            max: 6,
            large: 4,
            medium: 2,
            small: 1,
        };

        const column = columns[size];

        const w = 111;
        const m = 22;

        return column * w + ((column - 1) * m);
    }
    headerColor (project) {
        if (project.state==="CLOSED")
            return { background: 'none', color: '#333' };

        const m = {
            c: { background: '#e83929', color: '#fff' },
            h: { background: '#fcc800', color: '#333' },
            n: { background: '#89c3eb', color: '#333' },
            l: { background: '#dcdddd', color: '#333' },
            '?': { background: '#ffffff', color: '#333' },
        };

        return m[project.priority];
    }
    sizingButtonColors (priority) {
        const m = {
            c: { background: 'rgba(232,  58,  42, 0.8)', color: '#fff' },
            h: { background: 'rgba(252, 200,   0, 0.8)', color: '#333' },
            n: { background: 'rgba(137, 195, 235, 0.8)', color: '#333' },
            l: { background: 'rgba(220, 221, 221, 0.8)', color: '#333' },
        };

        return m[priority];
    }
    sortProjectsByPriority (projects) {
        const v = (type) => {
            const m = {
                '障害': 1,
                'リリース': 2,
                '案件': 3,
                '問い合せ': 4,
                'クラッシュ': 5,
                '改善': 6,
            };
            let  n = m[type];

            if (!n)
                n = 999;

            return n;
        };

        const sorted_projects = projects.sort((a,b)=> v(a.type) - v(b.type));

        const x = { c: [], h: [], n: [], l: [], '?': [] };

        for (const project of sorted_projects) {
            const p = project.priority || '?';

            x[p].push(project);
        }

        return [...x.c, ...x.h, ...x.n, ...x.l, ...x['?']];
    }
    sortIssuesByProjectAndPriority (issues) {
        const projects = {};

        for (const issue of issues) {
            const card = issue.projectCards.nodes;
            const project_id = card.length===0 ? null : card[0].column.project.id;

            if (!projects[project_id]) {
                if (project_id) {
                    const tmp = {...card[0].column.project, ...{issues: []}};
                    projects[project_id] = tmp || { id: null, issues: [] };
                } else {
                    projects[project_id] =  {id: null, issues: [] };
                }
                projects[project_id] = this.addAnotetionValue4Project(projects[project_id]);
            }

            const project = projects[project_id];

            issue.project = project;

            project.issues.push(issue);
        }

        const x = this.sortProjectsByPriority(Object.values(projects));

        return x.reduce((list,d) => list.concat(d.issues), []);
    }
    /////
    ///// summary issue
    /////
    summaryIssue (out, issue, project) {
        /// gross
        out.gross.points.plan   += issue.point.plan || 0;
        out.gross.points.result += issue.point.result || 0;

        // priority
        out.gross.priority[project.priority].plan += issue.point.plan;
        out.gross.priority[project.priority].result += issue.point.result;

        // assignee
        const sumAssignee = (assignee, issue, count, out) => {
            if (!out[assignee.id])
                out[assignee.id] = {
                    assignee: assignee,
                    points: { plan: 0, result: 0 },
                    issues: { open: 0, close:  0 },
                };

            const data = out[assignee.id];

            if (issue.point.plan)
                data.points.plan += issue.point.plan / count;

            if (issue.point.result)
                data.points.result += issue.point.result / count;

            if (issue.closedAt)
                data.issues.close += 1;
            else
                data.issues.open += 1;
        };

        for (const assignee of issue.assignees.nodes)
            sumAssignee(assignee,
                        issue,
                        issue.assignees.nodes.length,
                        out.assignees);

        if (issue.closedAt)
            out.gross.issues.close += 1;
        else
            out.gross.issues.open += 1;

        return out;
    }
    summaryIssues (out, project) {
        const issues = project.issues;

        return issues.reduce((out, issue)=>{
            this.summaryIssue(out, issue, project);
            return out;
        }, out);
    }
    summaryIssuesByProjects (projects) {
        const makeOut = () => {
            const x = { plan: 0, result: 0 };
            return {
                gross: {
                    points: {...x},
                    issues: { open: 0, close:  0 },
                    priority: { c: {...x}, h: {...x}, n: {...x}, l: {...x} },
                },
                assignees: {},
            };
        };

        return projects.reduce(
            (out, project)=> this.summaryIssues(out, project),
            makeOut());
    }
    /////
    ///// filter
    /////
    issues2filter (issues) {
        const assignees = { ht: {}, list: [] };
        const statuses = { ht: {}, list: [] };

        for (const issue of issues) {
            const k = issue.closedAt ? 'Close' : 'Open';
            if (!statuses.ht[k]) {
                const d = { title: k, count: 1 };
                statuses.ht[k] = d;
                statuses.list.push(d);
            } else {
                statuses.ht[k].count += 1;
            }

            for (const a of issue.assignees.nodes) {
                if (!assignees.ht[a.id]) {
                    assignees.ht[a.id] = a;
                    assignees.list.push(a);
                    a.issues = [];
                }

                const assignee = assignees.ht[a.id];

                assignee.issues.push(issue);
            }
        }

        return {
            assignees: assignees,
            statuses:  statuses,
        };
    }
    checkProjects (filter, issue) {
        const id_list = issue.projectCards.nodes.reduce((out, d) => {
            if (d.column)
                out.push(d.column.project.id);
            return out;
        }, []);

        const id_list_filterd = id_list.reduce((list, id)=> {
            if (filter.projects().includes(id))
                list.push(id);

            return list;
        }, []);

        return id_list_filterd.length===0;
    }
    checkAssignees (filter, issue) {
        const id_list = issue.assignees.nodes.map(d=>d.id);

        const id_list_filterd = id_list.reduce((list, id)=> {
            if (filter.assignees().indexOf(id)===-1)
                list.push(id);

            return list;
        }, []);

        return id_list_filterd.length > 0;
    }
    checkStatus (filter, issue) {
        if (!filter.statuses().Close && issue.closedAt)
            return false;

        if (!filter.statuses().Open && !issue.closedAt)
            return false;

        return true;
    }
    checkYesterday (filter, issue) {
        const yesterday = moment().startOf('day').add('d',-1);

        if (filter.others().Yesterday)
            if (moment(issue.updatedAt).isBefore(yesterday))
                return false;

        return true;
    }
    checkToday (filter, issue) {
        const fmt = (v) => moment(v).format('YYYYMMDD');

        const today = fmt(moment());

        if (filter.others().today)
            return fmt(issue.updatedAt)===today;

        return true;
    }
    checkWaiting (filter, issue) {
        if (!filter.others().Waiting)
            return true;

        if (issue.labels.nodes.find(d=>d.name.includes('待ち')))
            return true;

        return false;
    }
    checkEmptyPlan (filter, issue) {
        if (!filter.others().EmptyPlan)
            return true;

        if (issue.point.plan===null)
            return true;

        return false;
    }
    checkDiffMinus (filter, issue) {
        if (!filter.others().DiffMinus)
            return true;

        if ((issue.point.plan - issue.point.result) < 0)
            return true;

        return false;
    }
    checkKeyword (filter, issue) {
        const val = filter.keyword();

        if (val===null)
            return true;

        const keyword = val.toUpperCase();

        return (issue.number + '').toUpperCase().includes(keyword) ||
            issue.title.toUpperCase().includes(keyword);
    }
    filteringIssue (filter, issues) {
        return issues.reduce((list, issue) => {
            if (this.checkProjects(filter, issue) &&
                this.checkAssignees(filter, issue) &&
                this.checkToday(filter, issue) &&
                this.checkStatus(filter, issue) &&
                this.checkYesterday(filter, issue) &&
                this.checkEmptyPlan(filter, issue) &&
                this.checkWaiting(filter, issue) &&
                this.checkDiffMinus(filter, issue) &&
                this.checkKeyword(filter, issue))
                list.push(issue);

            return list;
        }, []);
    }
    /////
    labelColor (hexcolor) {
        var r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
        var g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
        var b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

        const color = ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;

        return color;
    }
    /////
    addListener () {}
    listeners () {}
    /////
    scrum() {
        if (!this._scrum) {
            this._scrum = new Scrum();
            this._scrum._sogh = this;
        }

        return this._scrum;
    }
    gtd() {
        if (!this._gtd) {
            this._gtd = new Gtd();
            this._gtd._sogh = this;
        }

        return this._gtd;
    }
    productBacklogs() {
        if (!this._product_backlogs) {
            this._product_backlogs = new ProductBacklogs();
            this._product_backlogs._sogh = this;
        }

        return this._product_backlogs;
    }
    productBacklog() {
        if (!this._product_backlog) {
            this._product_backlog = new ProductBacklog();
            this._product_backlog._sogh = this;
        }

        return this._product_backlog;
    }
}
