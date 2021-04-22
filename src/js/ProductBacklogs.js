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
        const value = item.value;

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
