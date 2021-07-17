import moment from 'moment';

import * as query from './GraphQL.js';
import GithubApiV3 from './GithubApiV3.js';
import GithubApiV4 from './GithubApiV4.js';

function owner (repo) {
    if ("string" === (typeof repo.owner))
        return repo.owner;

    return repo.owner.login;
}

export default class Loader {
    constructor (token) {
        this._token = null;

        this._viewer = null;

        this.api = {
            v3: null,
            v4: null,
        };
    }
    connect (token, success, error) {
        const api = new GithubApiV4(token);

        api.fetch(query.viwer, (results) => {
            const data = results.data;

            this._token = token;

            this._viewer = data.viewer;
            this.api.v3 = new GithubApiV3(token);
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
        console.warn('このメソッドは利用しないでください。\nGtd.getIssuesOpenByRepository の内容で置きかえる予定です。');
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
}
