import merge from 'deepmerge';

export default class Filter {
    constructor (filter) {
        this._filter = this.makeFilter(filter || {});
    }
    defaultFilter () {
        return {
            assignee: [],
            project: [],
            status: { Open: true, Close: true },
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
}
