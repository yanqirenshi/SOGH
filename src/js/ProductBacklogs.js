import moment from 'moment';

import SoghChild from './SoghChild.js';

export default class ProductBacklogs extends SoghChild {
    constructor (token) {
        super();

        this._projects = [];

        this._view_mode = 'table';

        this._filter = {
            status: { open: true, close: false },
            keyword: null,
            priorities: {},
            types: {},
            assignees: {},
            ommit_close: true,
            closing: false,
        };
    }
    apiV4 () {
        return this._sogh.api.v4;
    }
    sortProjectsByPriority (projects) {
        const splitByState = (projects) => {
            const x = { c: [], h: [], n: [], l: [], w: [], '?': [], closed: [] };

            for (const project of projects) {
                let p;

                if (project.state()==='CLOSED')
                    p = 'closed';
                else
                    p = project.priority() || '?';

                x[p].push(project);
            }
            return x;
        };

        const sortByPlanStart = (projects) => {
            const tmp = projects.reduce((ht,d) => {
                if (!d.plan.start)
                    ht[null].push(d);
                else
                    ht.exist.push(d);
                return ht;
            }, {null:[], exist: []});

            const sorter = (a,b) => {
                return moment(a.plan.start).isBefore(b.plan.start) ? -1 : 1;
            };

            return []
                .concat(tmp.exist.sort(sorter))
                .concat(tmp.null);
        };

        const sortByType = (projects) => {
            const tmp = projects.reduce((ht, d) => {
                if (!ht[d.type]) ht[d.type] = [];
                ht[d.type].push(d);
                return ht;
            }, {});

            let out = [];
            for (const k in tmp)
                out = out.concat(sortByPlanStart(tmp[k]));

            return out;
        };

        const sorted_projects = splitByState(projects);

        return []
            .concat(sortByType(sorted_projects.c))
            .concat(sortByType(sorted_projects.h))
            .concat(sortByType(sorted_projects.n))
            .concat(sortByType(sorted_projects.l))
            .concat(sortByType(sorted_projects['?']))
            .concat(sortByType(sorted_projects.closed));
    }
    getFilters (projects) {
        const priorities = {};
        const types = {};
        const assignees = {};

        const x = (key, ht) => {
            if (!ht[key])
                ht[key]  = 1;
            else
                ht[key] += 1;
        };

        for (const project of projects) {
            x(project.priority(), priorities);
            x(project.type(), types);
            x(project.assignee(), assignees);
        }

        const out = {
            priorities: [],
            types: [],
            assignees: [],
        };

        const makeItem = (type, k, count) => {
            return {
                type: type,
                code: type + k,
                value: k,
                count: count
            };
        };

        ['c', 'h', 'n', 'l'].reduce((out, k) => {
            if (k in priorities)
                out.push(makeItem('priorities', k, priorities[k]));

            return out;
        }, out.priorities);

        for (const k in types)
            out.types.push(makeItem('types', k, types[k]));

        for (const k in assignees)
            out.assignees.push(makeItem('assignees', k, assignees[k]));

        return out;
    }
    filtering (projects) {
        const filter = this._filter;

        const keyword = filter.keyword ? filter.keyword.toUpperCase() : null;
        const priorities = filter.priorities;
        const types = filter.types;
        const assignees = filter.assignees;
        const closing = filter.closing;

        return this.sortProjectsByPriority(projects.filter(project => {
            if (filter.ommit_close && project.closed())
                return false;

            if (keyword && !project.name().toUpperCase().includes(keyword))
                return false;

            if (priorities['priorities'+project.priority()])
                return false;

            if (types['types'+project.type()])
                return false;

            if (assignees['assignees'+project.assignee()])
                return false;

            if (closing) {
                const progress = project.progress();
                if (!(progress.doneCount > 1 &&
                      progress.inProgressCount === 0 &&
                      progress.todoCount <= 1)
                    && !project.result().end)
                    return false;
            }

            return true;
        }));
    }
    changeFilterKeyword (v) {
        const new_filter = {...this._filter};

        if (v.length===0)
            new_filter.keyword = null;
        else
            new_filter.keyword = v;

        this._filter = new_filter;
    }
    switchFilterPriority (item) {
        const type = item.type;
        const code = item.code;

        const new_filter = {...this._filter};

        const new_data = {...new_filter[type]};

        if (new_data[code])
            delete new_data[code];
        else
            new_data[code] = true;

        new_filter[type] = new_data;

        this._filter = new_filter;
    }
    switchFilterClosing (code) {
        const new_filter = {...this._filter};

        new_filter[code] = !new_filter[code];

        this._filter = new_filter;
    }
    setFilterClosing (v) {
        const new_filter = {...this._filter};

        new_filter.closing = v;

        this._filter = new_filter;
    }
    setFilterOmmitClose (v) {
        const new_filter = {...this._filter};

        new_filter.ommit_close = v;

        this._filter = new_filter;
    }
    changeAttributeAll (type, v) {
        const new_filter = {...this._filter};

        new_filter[type] = v;

        this._filter = new_filter;
    }
    changeViewMode (type) {
        this._view_mode = type;
    }
}
