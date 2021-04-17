import moment from 'moment';

import Filter from './Filter.js';

import * as query from './GraphQL.js';
import GithubApiV4 from './GithubApiV4.js';

export default class Scrum {
    constructor (token) {
        this._listeners = [];

        this._fetch = {
            start: null,
            end: null
        };

        this._data = {
            milestones: [],
            milestone: null,
            issues: [],
        };

        this._timeline = {
            filter: new Filter(),
            issues_filterd: null,
            duedates: {ht:[],list:[]},
            duedates_filterd: {ht:[],list:[]},
            close_projects: {},
        };

        this._projects = {
            filter: new Filter(),
            issues_filterd: null,
            projects: {ht:[],list:[]},
            projects_filterd: {ht:[],list:[]},
            close_projects: {},
        };
    }
    apiV4 () {
        return this._sogh.api.v4;
    }
    isNeverFetched () {
        return this._fetch.start ? false : true;
    }
    isCanFetchData () {
        if (!this._fetch.start && !this._fetch.end)
            return true;

        if (this._fetch.start && this._fetch.end)
            return true;

        return false;
    }
    addListeners (listener) {
        this._listeners.push(listener);
    }
    addPool (data, pool) {
        if (pool.ht[data.id])
            return;

        data.issues = [];

        pool.ht[data.id] = data;
        pool.list.push(data);
    }
    addAnotetionValue4Issue (issue) {
        issue.point = this.point(issue.body);

        const duedate = /.*@Due\.Date:\s+(\d+-\d+-\d+).*/.exec(issue.body);

        issue.due_date = duedate ? duedate[1] : null;

        return issue;
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
        const scheduleResult = (p) => {
            const ret = /.*@Result:(\s+\d+-\d+-\d+),\s+(\d+-\d+-\d+).*/.exec(p.body);

            if (!ret)
                return { start: null, end: null };

            return { start: moment(ret[1]), end: moment(ret[2]) };
        };

        const tat = titleAndType(project);
        project.title = tat.title;
        project.type = tat.type;

        project.plan = schedulePlan(project);
        project.result = scheduleResult(project);

        project.priority = priority(project);

        return project;
    }
    getMilestonesByRepository (repository, cb) {
        if (!this.apiV4()._token)
            cb([]);

        const api = this.apiV4();

        const base_query = query.milestone_by_reposigory
              .replace('@owner', repository.owner)
              .replace('@name',  repository.name);

        let milestones = [];
        const getter = (endCursor) => {
            let query = this._sogh.ensureEndCursor(base_query, endCursor);

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
    targetMilestone (milestones) {
        const sorted = milestones.sort((a,b) => a.dueOn < b.dueOn ? -1 :1);
        const now = moment();

        for (const m of sorted)
            if (now.isSameOrBefore(moment(m.dueOn)))
                return m;

        return null;
    }
    getIssuesByMilestone (milestone, cb) {
        if (!this.apiV4()._token)
            cb([]);

        if (!milestone) return;

        const api = this.apiV4();

        const base_query = query.issues_by_milestone
              .replace('@milestone-id', milestone.id);

        let issues = [];
        const getter = (endCursor) => {
            let query = this._sogh.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.node.issues;
                const page_info = data.pageInfo;

                for(const d of data.nodes)
                    issues.push(this._sogh.addAnotetionValue4Issue(d));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(issues);
            });
        };

        getter();
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
    filteringIssue (filter, issues) {

        const x = issues.reduce((list, issue) => {
            if (this._sogh.checkProjects(filter, issue) &&
                this._sogh.checkAssignees(filter, issue) &&
                this._sogh.checkStatus(filter, issue) &&
                this._sogh.checkYesterday(filter, issue) &&
                this._sogh.checkEmptyPlan(filter, issue) &&
                this._sogh.checkWaiting(filter, issue) &&
                this._sogh.checkDiffMinus(filter, issue))
                list.push(issue);

            return list;
        }, []);
        return x;
    }
    makeFilterdTimeline (issues) {
        const data = this._timeline;

        data.duedates = this.issues2dueDates(issues);

        data.issues_filterd
            = this.filteringIssue(data.filter, issues);

        data.duedates_filterd
            = this.issues2dueDates(data.issues_filterd);
    }
    makeFilterdProjects (issues) {
        const data = this._projects;

        data.projects = this.issues2projects(issues);

        data.issues_filterd
            = this.filteringIssue(data.filter, issues);

        data.projects_filterd
            = this.issues2projects(data.issues_filterd);
    }
    fetch (repository, cb) {
        this._fetch.start = new Date();
        this._fetch.end = null;

        this.getMilestonesByRepository(repository, (milestones) => {
            this._data.milestones = milestones;

            this._data.milestone = this.targetMilestone(milestones);

            this.getIssuesByMilestone(this._data.milestone, (issues) => {

                this._data.issues = issues;

                this.makeFilterdTimeline(issues);
                this.makeFilterdProjects(issues);

                this._fetch.end = new Date();

                for (const f of this._listeners)
                    f();

                if (cb)
                    cb();
            });
        });
    }
    changeFilter (target, type, id, cb) {

        const issues = this._data.issues;

        if ('timeline'===target) {
            this._timeline.filter.change(type, id);
            this.makeFilterdTimeline(issues);
        }

        if ('projects'===target) {
            this._projects.filter.change(type, id);
            this.makeFilterdProjects(issues);
        }

        if (cb) cb();
    }
    setFilterProjects (v, cb) {
        if ('all-hide'===v)
            this._projects.filter.set('projects',
                                      this._projects.hide_projects
                                      = this._projects.projects.list.map(d => d.id));

        if ('all-view'===v)
            this._projects.filter.set('projects', []);

        this.makeFilterdProjects(this._data.issues);

        if (cb) cb();
    }
    changeCloseProjects (type, v, cb) {
        if (v==='all') {
            const all = () => this._projects.projects.list.reduce((ht,d)=> {
                ht[d.id] = true;
                return ht;
            }, {});

            this._projects.close_projects = (type==='open') ? {} : all();
        } else {
            if ('open'===type) {
                const ht = {...this._projects.close_projects};

                if (ht[v])
                    delete ht[v];
                this._projects.close_projects = ht;
            } else if ('close'===type) {
                const ht = {...this._projects.close_projects};

                ht[v] = true;

                this._projects.close_projects = ht;
            }
        }

        if (cb) cb();
    }
}
