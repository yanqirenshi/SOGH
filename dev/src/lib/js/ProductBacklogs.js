import * as query from './GraphQL.js';

export default class ProductBacklogs {
    constructor (token) {
        this._sogh = null;

        this._projects = [];

        this._view_mode = 'table';

        this._filter = {
            keyword: null,
            priorities: {},
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
    filtering (projects) {
        const filter = this._filter;

        const keyword = filter.keyword;
        const priorities = filter.priorities;
        const closing = filter.closing;

        return this.sortProjectsByPriority(projects.filter(d => {
            if (keyword && !d.name.includes(keyword))
                return false;

            if (priorities[d.priority])
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
    switchFilterPriority (code) {
        const new_filter = {...this._filter};
        const new_priorities = {...new_filter.priorities};

        if (new_priorities[code])
            delete new_priorities[code];
        else
            new_priorities[code] = true;

        new_filter.priorities = new_priorities;

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
