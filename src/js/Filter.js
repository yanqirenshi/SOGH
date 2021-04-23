import moment from 'moment';
import merge from 'deepmerge';

export default class Filter {
    constructor (filter) {
        this._filter = this.makeFilter(filter || {});
    }
    defaultFilter () {
        return {
            assignee: [],
            project: [],
            status: { Open: true, Close: false },
            others: {
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
    change (type, id) {
        if (type==='assignee')
            this.assignees(this.changeFilterList(id, this.assignees()));
        else if (type==='projects' || type==='project')
            this.projects(this.changeFilterList(id, this.projects()));
        else if (type==='status')
            this.statuses(this.changeFilterHt(id, this.statuses()));
        else if (type==='others')
            this.others(this.changeFilterHt(id, this.others()));
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
    //
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
            if (filter.projects().includes(id))
                list.push(id);

            return list;
        }, []);

        return id_list_filterd.length===0;
    }
    checkAssignees (filter, issue) {
        const id_list = issue.assignees.nodes.map(d=>d.id);

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
    apply (issues) {
        const filter = this;

        return issues.reduce((list, issue) => {
            if (this.checkProjects(filter, issue) &&
                this.checkAssignees(filter, issue) &&
                this.checkStatus(filter, issue) &&
                this.checkYesterday(filter, issue) &&
                this.checkEmptyPlan(filter, issue) &&
                this.checkWaiting(filter, issue) &&
                this.checkDiffMinus(filter, issue))
                list.push(issue);

            return list;
        }, []);
    }
}
