import moment from 'moment';
import merge from 'deepmerge';

export default class Filter {
    constructor (filter) {
        this._filter = this.makeFilter(filter || {});
    }
    defaultFilter () {
        return {
            keyword: null,
            assignee: [],
            project: [],
            status: { Open: true, Close: false },
            others: {
                today: false,
                Yesterday: false,
                Waiting: false,
                EmptyPlan: false,
                DiffMinus: false,
            },
        };
    }
    makeFilter (filter) {
        return merge(this.defaultFilter(), filter);
    }
    // change
    changeFilterKeyword (str) {
        if ((typeof str)!=='string')
            return null;

        if (str.length===0)
            return null;

        return str;
    }
    changeFilterList (id, filter) {
        const new_filter = [...filter];

        const pos = new_filter.indexOf(id);

        if (pos===-1)
            new_filter.push(id);
        else
            new_filter.splice(pos, 1);

        return new_filter;
    }
    changeFilterHt (id, filter) {
        const new_filter = {...filter};

        new_filter[id] = !new_filter[id];

        return new_filter;
    }
    change (type, value) {
        if (type==='assignee')
            this.assignees(this.changeFilterList(value, this.assignees()));
        else if (type==='projects' || type==='project')
            this.projects(this.changeFilterList(value, this.projects()));
        else if (type==='status')
            this.statuses(this.changeFilterHt(value, this.statuses()));
        else if (type==='others')
            this.others(this.changeFilterHt(value, this.others()));
        else if (type==='keyword')
            this.keyword(this.changeFilterKeyword(value));
    }
    set (type, v) {
        if (type==='assignee')
            this.assignees(v);
        else if (type==='projects' || type==='project')
            this.projects(v);
        else if (type==='status')
            this.statuses(v);
        else if (type==='others')
            this.others(v);
    }
    //
    keyword (v) {
        if (arguments.length>0)
            this._filter.keyword = v;

        return this._filter.keyword;
    }
    assignees (v) {
        if (arguments.length>0)
            this._filter.assignee = v;

        return this._filter.assignee;
    }
    projects (v) {
        if (arguments.length>0)
            this._filter.project = v;

        return this._filter.project;
    }
    statuses (v) {
        if (arguments.length>0)
            this._filter.status = v;

        return this._filter.status;
    }
    others (v) {
        if (arguments.length>0)
            this._filter.others = v;

        return this._filter.others;
    }
    // issues filter
    issues2filter (issues) {
        const assignees = { ht: {}, list: [] };
        const statuses = { ht: {}, list: [] };

        for (const issue of issues) {
            const k = issue.closedAt() ? 'Close' : 'Open';

            if (!statuses.ht[k]) {
                const d = { title: k, count: 1 };
                statuses.ht[k] = d;
                statuses.list.push(d);
            } else {
                statuses.ht[k].count += 1;
            }

            for (const a of issue.assignees()) {
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
        const id_list = issue.projectCards().reduce((out, d) => {
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
        const id_list = issue.assignees().map(d=>d.id);

        if (id_list.length===0)
            return true;

        const id_list_filterd = id_list.reduce((list, id)=> {
            if (filter.assignees().indexOf(id)===-1)
                list.push(id);

            return list;
        }, []);

        return id_list_filterd.length > 0;
    }
    checkStatus (filter, issue) {
        const closed_at = issue.closedAt();

        if (!filter.statuses().Close && closed_at)
            return false;

        if (!filter.statuses().Open && !closed_at)
            return false;

        return true;
    }
    checkYesterday (filter, issue) {
        const fmt = (v) => moment(v).format('YYYYMMDD');

        const yesterday = fmt(moment().add(-1, 'd'));

        if (filter.others().Yesterday)
            return fmt(issue.updatedAt())===yesterday;

        return true;
    }
    checkToday (filter, issue) {
        const fmt = (v) => moment(v).format('YYYYMMDD');

        const today = fmt(moment());

        if (filter.others().today)
            return fmt(issue.updatedAt())===today;

        return true;
    }
    checkWaiting (filter, issue) {
        if (!filter.others().Waiting)
            return true;

        if (issue.labels().find(d=>d.name.includes('待ち')))
            return true;

        return false;
    }
    checkEmptyPlan (filter, issue) {
        if (!filter.others().EmptyPlan)
            return true;

        if (issue.point().plan===null)
            return true;

        return false;
    }
    checkDiffMinus (filter, issue) {
        if (!filter.others().DiffMinus)
            return true;

        if ((issue.point().plan - issue.point().result) < 0)
            return true;

        return false;
    }
    checkKeyword (filter, issue) {
        const val = filter.keyword();

        if (val===null)
            return true;

        const keyword = val.toUpperCase();

        return (issue.number() + '').toUpperCase().includes(keyword) ||
            issue.title().toUpperCase().includes(keyword);
    }
    apply (issues) {
        const filter = this;

        return issues.reduce((list, issue) => {
            if (this.checkProjects(filter, issue) &&
                this.checkAssignees(filter, issue) &&
                this.checkStatus(filter, issue) &&
                this.checkYesterday(filter, issue) &&
                this.checkToday(filter, issue) &&
                this.checkEmptyPlan(filter, issue) &&
                this.checkWaiting(filter, issue) &&
                this.checkDiffMinus(filter, issue) &&
                this.checkKeyword(filter, issue))
                list.push(issue);

            return list;
        }, []);
    }
    // issues filter
    issues2filter4Gtd (old_filter, issues) {
        const projects = {};
        const milestones = {};

        const active = (type, milestone) => {
            const old = old_filter[type].ht[milestone.id];
            return old ? old.active : true;
        };

        for (const issue of issues) {
            const milestone = issue.milestone();

            if (milestone && !milestones[milestone.id]) {
                milestones[milestone.id] = milestone;
                milestones[milestone.id].active = active('milestones', milestone);
            }

            const cards = issue.projectCards.nodes;
            if (cards.length>0)
                for (const card of cards) {
                    if (!card.column)
                        continue;

                    const project = card.column.project;

                    if (!projects[project.id]) {
                        projects[project.id] = project;
                        projects[project.id].active = active('projects', project);
                    }
                }
        }

        return {
            projects:   { ht: projects,   list: Object.values(projects) },
            milestones: { ht: milestones, list: Object.values(milestones) },
            contents: old_filter.contents,
        };
    }
}
