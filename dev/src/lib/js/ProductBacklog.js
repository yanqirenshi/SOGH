import Filter from './Filter.js';

import SoghChild from './SoghChild.js';

export default class ProductBacklog extends SoghChild {
    constructor () {
        super();

        this._projects = [];

        this._view_mode = 'table';

        this._fetching = null;

        this.clearData();

        this._filters = {
            milestones: new Filter(),
            columns: new Filter(),
        };
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
    getProjectByID (id, cb) {
        this._sogh.getProjectByID(id, (project) => cb(project));
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
        const cards = issue.projectCards();

        return cards.find(card=> {
            return card.column && card.column.project.id===project.id();
        });
    }
    makeColumns (project) {
        return project.columns().reduce((ht,column) => {
            const new_column = {...column};

            new_column.issues = [];
            ht[new_column.id] = new_column;

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

            const addAssgingee = (ht, assignee) => {
                if (!ht[assignee.id]) {
                    ht[assignee.id] = {...assignee};
                    ht[assignee.id].columns = {};
                }

                if (!ht[assignee.id].columns[column.id])
                    ht[assignee.id].columns[column.id] = [];

                ht[assignee.id].columns[column.id].push(issue);

                return ht;
            };

            if(issue.assignees().length===0)
                addAssgingee(assignees, { id: null, name: '@未割り当て'});

            issue.assignees().reduce(addAssgingee, assignees);
        }

        const sorter_m = (a,b) => a.dueOn < b.dueOn ? 1 : -1;
        const sorter_c = (a,b) => a.name  < b.name ? -1 : 1;

        const ht2list = (list, sorter) => Object.values(list).sort(sorter);

        this._data.milestones = { ht: milestones, list: ht2list(milestones, sorter_m)};
        this._data.columns    = { ht: columns,    list: ht2list(columns, sorter_c) };
        this._data.assignees  = { ht: assignees,  list: ht2list(assignees, sorter_c) };
    }
    fetch (project, cb) {
        if (!project)
            return;

        this.clearData();

        const columns = project.columns();

        this._fetching = columns.reduce((ht,d)=>{
            ht[d.id] = null;
            return ht;
        }, {});

        for (const column of columns)
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
