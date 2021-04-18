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
            assignees:  { ht: {}, list: [] },
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
    getCard (project, issue) {
        const cards = issue.projectCards.nodes;

        return cards.find(d=>d.column.project.id===project.id);
    }
    makeColumns (project) {
        return project.columns.nodes.reduce((ht,c) => {
            const new_c = {...c};

            new_c.issues = [];
            ht[new_c.id] = new_c;

            return ht;
        }, {});
    };
    makeData (project, issues) {
        const milestones = {};
        const columns = this.makeColumns(project);
        const assignees = {};

        for (const issue of issues) {
            const milestone = this.ensureMilestone (issue, milestones);
            milestone.issues.push(issue);

            const card = this.getCard(project, issue);

            const column = this.ensureColumn(card, columns);
            column.issues.push(issue);

            issue.assignees.nodes.reduce((ht, a) => {
                if (!ht[a.id]) {
                    ht[a.id] = {...a};
                    ht[a.id].columns = {};
                }

                if (!ht[a.id].columns[column.id])
                    ht[a.id].columns[column.id] = [];

                ht[a.id].columns[column.id].push(issue);

                return ht;
            }, assignees);
        }

        const sorter_m = (a,b) => a.dueOn < b.dueOn ? 1 : -1;
        const sorter_c = (a,b) => a.name  < b.name ? -1 : 1;

        const ht2list = (list, sorter) => Object.values(list).sort(sorter);

        this._data.milestones = { ht: milestones, list:  ht2list(milestones, sorter_m)};
        this._data.columns    = { ht: columns,    list: ht2list(columns, sorter_c) };
        this._data.assignees  = { ht: assignees,  list: ht2list(assignees, sorter_c) };
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

                this.makeData(project, this._data.issues);

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
    sortColumns (columns) {
        const purposes = columns.reduce((ht, d) => {
            const purpose = d.purpose;

            if (!ht[purpose])
                ht[purpose] = [];

            ht[purpose].push(d);

            return ht;
        }, {});

        return [ 'TODO', 'IN_PROGRESS', null, 'DONE' ].reduce((out, p) => {
            if (!purposes[p]) return out;

            return out.concat(purposes[p].sort((a,b) => a.id<b.id ? -1 : 1));
        }, []);
    }
}
