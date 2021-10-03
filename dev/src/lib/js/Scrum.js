import moment from 'moment';

import SoghChild from './SoghChild.js';

import Filter from './Filter.js';
import Pool from './Pool2.js';

import {Project} from './models/index.js';

const POOL = new Pool();

export default class Scrum extends SoghChild {
    constructor (token) {
        super();

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

        this.refreshTimeline();
        this.refreshProjects();
    }
    refreshTimeline () {
        this._timeline = {
            filter: new Filter(),
            issues_filterd: null,
            duedates: {ht:[],list:[]},
            duedates_filterd: {ht:[],list:[]},
            next_action_dates_filterd: {ht:[],list:[]},
            close_duedates: {},
        };
    }
    refreshProjects () {
        this._projects = {
            filter: new Filter(),
            issues_filterd: null,
            projects: {ht:[],list:[]},
            projects_filterd: {ht:[],list:[]},
            close_projects: {},
        };
    }
    setMilestone (milestone) {
        this._data.milestone = milestone;
        this._data.issues = [];

        this.refreshTimeline();
        this.refreshProjects();

        for (const f of this._listeners)
            f();
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
    targetMilestones (milestones) {
        const now = moment().startOf('date');

        const filter = milestone => {
            const ret = /(\d+-\d+-\d+)\s*〜\s*(\d+-\d+-\d+)/.exec(milestone.title());

            if (!ret) return false;

            const from = moment(ret[1]);
            const to   = moment(ret[2]);

            if (!from.isValid() || !to.isValid())
                return false;

            milestone.term = {
                from: from,
                to: to,
            };

            return from.isSameOrBefore(now) && to.isSameOrAfter(now);
        };

        const sorter = (a,b) => a.dueOn < b.dueOn ? -1 :1;

        return milestones.filter(filter).sort(sorter);
    }
    targetMilestone (milestones) {
        const sorted = milestones.sort((a,b) => a.dueOn < b.dueOn ? -1 :1);
        const now = moment();

        for (const m of sorted)
            if (now.isSameOrBefore(moment(m.dueOn)))
                return m;

        return null;
    }
    issues2dates (type, issues) {
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

        const dateByType = (issue) => {
            if ('due_date'===type)
                return issue.dueDate();

            if ('date_next_action'===type)
                return issue.nextActionDate();

            return null;
        };

        for (const issue of issues) {
            const key = dd(issue.closedAt() || dateByType(issue));

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
                // issues: [],
                priority: 'l',
            };
        };

        for (const issue of issues) {
            if (issue.projectCards().length===0) {
                const project = new Project(empyProject());

                POOL.addPool(project, pool);

                project.issues().push(issue);
            } else {
                const column = issue.projectCards()[0].column;

                if (!column) continue;

                const project = new Project(column.project);

                POOL.addPool(project, pool);

                project.issues().push(issue);
            }
        }

        return pool;
    }
    makeFilterdTimeline (issues) {
        const data = this._timeline;

        const filter = data.filter;

        data.duedates = this.issues2dates('due_date', issues);
        data.next_action_dates = this.issues2dates('date_next_action', issues);

        data.issues_filterd = filter.apply(issues);

        data.duedates_filterd
            = this.issues2dates('due_date', data.issues_filterd);

        data.next_action_dates_filterd
            = this.issues2dates('date_next_action', data.issues_filterd);
    }
    makeFilterdProjects (issues) {
        const data = this._projects;
        const filter = data.filter;

        data.projects = this.issues2projects(issues);

        data.issues_filterd = filter.apply(issues);

        data.projects_filterd = this.issues2projects(data.issues_filterd);
    }
    fetchIssues (milestone, cb) {
        this._fetch.start = new Date();
        this._fetch.end = null;

        this.setMilestone(milestone);

        this._sogh.getIssuesByMilestone(this._data.milestone, (issues) => {

            this._data.issues = issues;

            this.makeFilterdTimeline(issues);
            this.makeFilterdProjects(issues);

            this._fetch.end = new Date();

            for (const f of this._listeners)
                f();

            if (cb)
                cb();
        });

    }
    fetch (repository, cb) {
        this._fetch.start = new Date();
        this._fetch.end = null;

        const getTargetMilestone = (milestone, milestones) => {
            if (this._data.milestones.length===0)
                return null;

            if (!milestone)
                return this._data.milestones[0];

            return this._data.milestones.find(d=>d.id()===milestone.id()) || this._data.milestones[0];
        };

        // リポジトリのマイルストーンを全て取得する。
        this._sogh.getMilestonesByRepository(repository, (milestones) => {
            this._data.milestones = this.targetMilestones(milestones);

            if (this._data.milestones.length===0) {
                this._data.milestone = null;
                this._data.issues = [];
                cb();
            }

            this._data.milestone = getTargetMilestone(this._data.milestone ,this._data.milestones);

            // マイルストーンのイシューを全て取得する。
            this._sogh.getIssuesByMilestone(this._data.milestone, (issues) => {

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
            const all = () => this._projects.projects.list.reduce((ht,issue)=> {
                ht[issue.id()] = true;
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
    changeCloseDueDates (type, v, cb) {
        if (v==='all') {
            const all = () => this._timeline.duedates.list.reduce((ht,issue)=> {
                ht[issue.dueDate()] = true;
                return ht;
            }, {});

            this._timeline.close_duedates = (type==='open') ? {} : all();
        } else {
            if ('open'===type) {
                const ht = {...this._timeline.close_duedates};

                if (ht[v])
                    delete ht[v];
                this._timeline.close_duedates = ht;
            } else if ('close'===type) {
                const ht = {...this._timeline.close_duedates};

                ht[v] = true;

                this._timeline.close_duedates = ht;
            }
        }

        if (cb) cb();
    }
    summaryIssueInRecord (record, issue) {
        const point = issue.points();

        record.plan += (point.plan || 0);

        const results = point.results;
        record.result += ((results ? results.total : point.result) || 0);

        return record;
    }
    summaryDuedates (duedates) {
        const ht = duedates.ht;
        const dates = Object.keys(ht).sort();

        return dates.map(date=>{
            const issues = ht[date];
            const record = { key: date, plan: 0, result: 0 };

            return issues.reduce(this.summaryIssueInRecord, record);
        });
    }
    summaryProjects (projects) {
        return projects.map(project=>{
            const issues = project.issues();
            const record = { key: project, plan: 0, result: 0 };

            return issues.reduce(this.summaryIssueInRecord, record);
        });
    }
}
