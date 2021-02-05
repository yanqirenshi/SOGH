import moment from 'moment';
import * as query from './GraphQL.js';

class GithubApiV3 {
    makeHeader (api) {
        return {
            'Authorization': `bearer ${api.__auth.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }
    postData (api, query) {
        return {
            method: 'POST',
            headers: this.makeHeader(api),
            body: JSON.stringify({query: query})
        };
    }
    fetch (api, query, cb) {
        const endpoint = 'https://api.github.com/graphql';

        fetch(endpoint, this.postData(api, query))
            .then(response => response.json())
            .then(cb);
    }
}

class GithubApiV4 {
    constructor (token) {
        this._token = token;
    }
    token (api_or_token) {
        if ((typeof api_or_token)==="string")
            return api_or_token;
        else
            return api_or_token.__auth.token;
    }
    makeHeader (api_or_token) {
        return {
            'Authorization': `bearer ${this.token(api_or_token)}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }
    postData (api_or_token, query) {
        return {
            method: 'POST',
            headers: this.makeHeader(api_or_token),
            body: JSON.stringify({query: query})
        };
    }
    fetch (query, cb) {
        const endpoint = 'https://api.github.com/graphql';

        fetch(endpoint, this.postData(this._token, query))
            .then(response => response.json())
            .then(cb);
    }
}

export default class Sogh {
    constructor (token) {
        this._token = token || null;

        this.api = {
            v3: new GithubApiV3(this._token),
            v4: new GithubApiV4(this._token),
        };
    }
    ensureEndCursor(query, endCursor) {
        if (endCursor)
            return query.replace('after: "",', `after: "${endCursor}",`);

        return query.replace('after: "",', '');
    }
    getMilestonesByRepository (repository, cb) {
        if (!this.api.v4._token)
            cb([]);

        const api = this.api.v4;

        const base_query = query.milestone_by_reposigory
              .replace('@owner', repository.owner)
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
    point (v) {
        const plan = /.*@Point\.Plan:\s+(\d+).*/.exec(v);
        const result = /.*@Point\.Result:\s+(\d+).*/.exec(v);

        return {
            plan:   plan ? plan[1] * 1 : null,
            result: result ? result[1] * 1 : null,
        };
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

        const titleAndType = (p) => {
            const name = p.name;
            const ret = /^【(.*)】(.*)$/.exec(name);

            if (!ret)
                return { title: name, type: null };

            return { title: ret[2], type: ret[1] };
        };

        const schedulePlan = (p) => {
            const ret = /.*@Plan:(\s+\d+-\d+-\d+),\s+(\d+-\d+-\d+).*/.exec(p.body);

            if (!ret)
                return { start: null, end: null };

            return { start: moment(ret[1]), end: moment(ret[2]) };
        };

        const tat = titleAndType(project);
        project.title = tat.title;
        project.type = tat.type;

        project.plan = schedulePlan(project);

        project.priority = priority(project);

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

                issues = issues.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(issues.map(d => {
                        d.point = this.point(d.body);
                        return d;
                    }));
                }
            });
        };

        getter();
    }
    getIssuesByRepository (repository, cb) {
        if (!this.api.v4._token)
            cb([]);

        if (!repository)
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

                issues = issues.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(issues.map(d => {
                        d.point = this.point(d.body);
                        return d;
                    }));
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
              .replace('@owner', repository.owner)
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
                const project = this.addAnotetionValue4Project(issue.projectCards.nodes[0].column.project);

                this.addPool(project, pool);

                pool.ht[project.id].issues.push(issue);
            }
        }

        return pool;
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
            const p = project.priority;

            x[p].push(project);
        }

        return [...x.c, ...x.h, ...x.n, ...x.l ];

    }
    /////
    ///// summary issue
    /////
    summaryIssue (out, issue) {
        out.gross.points.plan   += issue.point.plan || 0;
        out.gross.points.result += issue.point.result || 0;

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
    summaryIssues (out, issues) {
        return issues.reduce(this.summaryIssue, out);
    }
    summaryIssuesByProjects (projects) {
        const makeOut = () => {
            return {
                gross: {
                    points: { plan: 0, result: 0 },
                    issues: { open: 0, close:  0 },
                },
                assignees: {},
            };
        };

        return projects.reduce(
            (out, project)=> this.summaryIssues(out, project.issues),
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
            out.push(d.column.project.id);
            return out;
        }, []);

        const id_list_filterd = id_list.reduce((list, id)=> {
            if (filter.project.includes(id))
                list.push(id);

            return list;
        }, []);

        return id_list_filterd.length===0;
    }
    checkAssignees (filter, issue) {
        const id_list = issue.assignees.nodes.map(d=>d.id);

        const id_list_filterd = id_list.reduce((list, id)=> {
            if (filter.assignee.indexOf(id)===-1)
                list.push(id);

            return list;
        }, []);

        return id_list_filterd.length > 0;
    }
    checkStatus (filter, issue) {
        if (!filter.status.Close && issue.closedAt)
            return false;

        if (!filter.status.Open && !issue.closedAt)
            return false;

        return true;
    }
    checkYesterday (filter, issue) {
        const yesterday = moment().startOf('day').add('d',-1);

        if (filter.others.Yesterday)
            if (moment(issue.updatedAt).isBefore(yesterday))
                return false;

        return true;
    }
    checkWaiting (filter, issue) {
        if (!filter.others.Waiting)
            return true;

        if (issue.labels.nodes.find(d=>d.name.includes('待ち')))
            return true;

        return false;
    }
    checkEmptyPlan (filter, issue) {
        if (!filter.others.EmptyPlan)
            return true;

        if (issue.point.plan===null)
            return true;

        return false;
    }
    filteringIssue (filter, issues) {
        return issues.reduce((list, issue) => {
            if (this.checkProjects(filter, issue) &&
                this.checkAssignees(filter, issue) &&
                this.checkStatus(filter, issue) &&
                this.checkYesterday(filter, issue) &&
                this.checkEmptyPlan(filter, issue) &&
                this.checkWaiting(filter, issue))
                list.push(issue);

            return list;
        }, []);
    }
}
