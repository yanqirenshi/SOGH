import * as query from './GraphQL.js';

import SoghChild from './SoghChild.js';
import FilterGtd from './FilterGtd.js';

const FILTER = new FilterGtd();

function owner (owner) {
    if ("string" === (typeof owner))
        return owner;

    return owner.login;
}

export default class Gtd extends SoghChild{
    constructor () {
        super();

        this._listeners = [];

        this._pool = {
            ht:{},
            list:[]
        };

        this._fetch = {
            start: null,
            end: null
        };

        this._filter = {
            projects:   { ht: {}, list: [] },
            milestones: { ht: {}, list: [] },
            contents: {
                word: '',
                targets: { labels: true, title: false } ,
            },
        };
    }
    apiV4 () {
        return this._sogh.api.v4;
    }
    viewer () {
        return this._sogh._viewer;
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
    responseListeners () {
        for (const f of this._listeners)
            f();
    }
    getIssuesOpenByRepository (repository, viewer, cb) {
        if (!this.apiV4()._token || !repository)
            cb([]);

        this._fetch.start = new Date();
        this._fetch.end = null;

        const api = this.apiV4();

        const base_query = query.issues_open_by_repository
              .replace('@owner', owner(repository.owner))
              .replace('@name', repository.name);

        const isViewer = (issue) => {
            return issue.assignees.nodes.find(d=>d.id===viewer.id);
        };

        let issues = [];
        const getter = (endCursor) => {
            let query = this._sogh.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.issues;
                const page_info = data.pageInfo;

                for(const issue of data.nodes)
                    if (isViewer(issue))
                        issues.push(this._sogh.addAnotetionValue4Issue(issue));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else {
                    this._fetch.end = new Date();

                    this._pool.list = issues;

                    this.responseListeners();

                    cb(issues);
                }
            });
        };

        getter();
    }
    issues2filter (old_filter, issues) {
        return FILTER.issues2filter(old_filter, issues);
    }
    applyFilter (filter, issues) {
        return FILTER.apply(filter, issues);
    }
    changeFilter (id, value) {
        const project = this._filter.projects.ht[id];
        const milestones = this._filter.milestones.ht[id];

        if (!project && !milestones)
            return false;

        if (this._filter.projects.ht[id])
            this._filter.projects.ht[id].active = value;

        if (this._filter.milestones.ht[id])
            this._filter.milestones.ht[id].active = value;

        return true;
    }
    changeFilterContents (type, value) {
        if ('word'===type) {
            if (this._filter.contents.word===value)
                return false;

            this._filter.contents.word = value;
        }

        if ('labels'===type) {
            if (this._filter.contents.targets.labels===value)
                return false;
            this._filter.contents.targets.labels = value;
        }

        if ('title'===type) {
            if (this._filter.contents.targets.title===value)
                return false;
            this._filter.contents.targets.title = value;
        }

        return true;
    }
    changeFilterAll (type, v) {
        if (!this._filter[type])
            return false;

        let diff = false;
        for (const d of this._filter[type].list)
            if (d.active !== v) {
                d.active = v;
                diff = true;
            }

        return diff;
    }
}
