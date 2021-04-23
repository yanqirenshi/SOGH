import moment from 'moment';

import * as query from './GraphQL.js';

export default class ProductBacklogs {
    constructor (token) {
        this._sogh = null;

        this._projects = [];

        this._view_mode = 'table';

        this._filter = {
            status: { open: true, close: false },
            keyword: null,
            priorities: {},
            types: {},
            assignees: {},
            closing: false,
        };
    }
    apiV4 () {
        return this._sogh.api.v4;
    }
    viewer () {
        return this._sogh._viewer;
    }
    getProjectsByRepository (repository, cb) {
        if (!this.apiV4()._token || !repository)
            cb([]);

        const api = this.apiV4();

        const base_query = query.projects_by_repository
              .replace('@owner', repository.owner)
              .replace('@name', repository.name);

        let projects = [];
        const getter = (endCursor) => {
            let query = this._sogh.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.projects;
                const page_info = data.pageInfo;

                projects = projects.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(projects.map(this._sogh.addAnotetionValue4Project));
                }
            });
        };

        getter();
    }
    sortProjectsByPriority (projects) {
        const splitByState = (projects) => {
            const x = { c: [], h: [], n: [], l: [], '?': [], closed: [] };

            for (const project of projects) {

                let p;
                if (project.state==='CLOSED')
                    p = 'closed';
                else
                    p = project.priority || '?';

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

        const x = (project, attr, ht) => {
            const key = project[attr];

            if (!ht[key]) ht[key]  = 1;
            else          ht[key] += 1;
        };

        for (const project of projects) {
            x(project, 'priority', priorities);
            x(project, 'type', types);
            x(project, 'assignee', assignees);
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

        const keyword = filter.keyword;
        const priorities = filter.priorities;
        const types = filter.types;
        const assignees = filter.assignees;
        const closing = filter.closing;

        return this.sortProjectsByPriority(projects.filter(d => {
            if (keyword && !d.name.includes(keyword))
                return false;

            if (priorities['priorities'+d.priority])
                return false;

            if (types['types'+d.type])
                return false;

            if (assignees['assignees'+d.assignee])
                return false;

            if (closing)
                if (!(d.progress.doneCount > 1 &&
                      d.progress.inProgressCount === 0 &&
                      d.progress.todoCount <= 1)
                    && !d.result.end)
                    return false;

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
    changeViewMode (type) {
        this._view_mode = type;
    }
}
