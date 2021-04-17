import Filter from './Filter.js';

export default class ProductBacklog {
    constructor (token) {
        this._sogh = null;

        this._projects = [];

        this._view_mode = 'table';

        this._fetching = null;

        this.clearData();

        this._filters = {
            milestones: new Filter(),
            columns: new Filter(),
        };
    }
    apiV4 () {
        return this._sogh.api.v4;
    }
    viewer () {
        return this._sogh._viewer;
    }
    clearData () {
        this._data = {
            issues: [],
            milestones: { ht: {}, list: [] },
            columns:    { ht: {}, list: [] },
        };
    }
    changeFilter (target, type, id, cb) {
        this._filters[target].change(type, id);

        if (cb) cb();
    }
    getProjectByID (id, setProject) {
        this._sogh.getProjectByID(id, (project) => setProject(project));
    }
    ensureMilestone (issue, milestones) {
        const milestone_id = issue.milestone ? issue.milestone.id : null;

        if (milestones[milestone_id])
            return milestones[milestone_id];

        const milestone = milestone_id ? {...issue.milestone} : {
            id: null,
            title: "未割り当て",
            labels: {nodes: []},
            dueOn: null,
        };

        milestone.issues = [];

        milestones[milestone_id] = milestone;

        return milestone;
    }
    ensureColumn (card, columns) {
        const column_id = card.column.id;

        if (columns[column_id])
            return columns[column_id];

        const column = {...card.column};

        column.issues = [];

        columns[column_id] = column;

        return column;
    }
    makeContents (project, issues) {
        const milestones = {};
        const columns = {};

        for (const issue of issues) {
            const milestone = this.ensureMilestone (issue, milestones);
            milestone.issues.push(issue);

            const card = issue.projectCards.nodes.find(d=>d.column.project.id===project.id);
            const column = this.ensureColumn(card, columns);
            column.issues.push(issue);
        }

        const sorter_m = (a,b) => a.dueOn < b.dueOn ? 1 : -1;
        const sorter_c = (a,b) => a.name  < b.name ? -1 : 1;

        return {
            milestones: { ht: milestones, list: Object.values(milestones).sort(sorter_m) },
            columns:    { ht: columns,    list: Object.values(columns).sort(sorter_c) },
        };
    }
    fetch (project, cb) {
        if (!project)
            return;

        this.clearData();

        this._fetching = project.columns.nodes.reduce((ht,d)=>{
            ht[d.id] = null;
            return ht;
        }, {});

        for (const column of project.columns.nodes)
            this._sogh.getIssuesByProjectColumn(column, (ret)=> {
                this._data.issues = this._data.issues.concat(ret);

                this._fetching[column.id] = new Date();

                const c = this.makeContents(project, this._data.issues);

                this._data.milestones = c.milestones;
                this._data.columns = c.columns;

                cb(this._data.issues);

                const is_finished = Object.values(this._fetching).indexOf(null)===-1;

                if (is_finished)
                    this._fetching = null;
            });
    }
    selectedTab (location, tabs) {
        const selected_tab_code = new URLSearchParams(location.search).get('tab');

        return tabs.find(d=>d.code===selected_tab_code) || tabs[0];
    }
}
