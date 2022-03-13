import * as model from './models/index.js';

import Pool8 from './Pool8.js';
import * as K from './Karma.js';

class Graph {
    constructor (token) {
        this._indexes = {
            repositories: new Pool8(),
            projects:     new Pool8(),
            columns:      new Pool8(),
            cards:        new Pool8(),
            milestones:   new Pool8(),
            issues:       new Pool8(),
            labels:       new Pool8(),
            assignees:    new Pool8(),
        };
    }
    merge (type, list) {
        if (type==='issues')
            return this.mergeIssues(list);

        return null;
    }
    /////
    ///// Label
    /////
    mergeLabel (core, source) {
        const index = this._indexes.labels;

        let label = index.get(core.id);

        if (label) {
            label.set(core);
        } else {
            label = new model.Label(core);
            index.add(label);
        }

        if (source)
            K.deletesInsert(source, label);

        return label;
    }
    mergeLabels (list, source) {
        if (!list || list.length===0)
            return [];

        const list_new = list.reduce((out, core)=> {
            const label = this.mergeLabel(core);

            out.push(label);

            return out;
        }, []);

        if (source)
            K.deletesInserts(source, list_new);

        return list_new;
    }
    /////
    ///// Assignees
    /////
    mergeAssignee (core, source) {
        const index = this._indexes.assignees;

        let assignee = index.get(core.id);

        if (assignee) {
            assignee.set(core);
        } else {
            assignee = new model.Assignee(core);
            index.add(assignee);
        }

        if (source)
            K.deletesInsert(source, assignee);

        return assignee;
    }
    mergeAssignees (list, source) {
        if (!list || list.length===0)
            return [];

        const list_new = list.reduce((out, core)=> {
            const assignee = this.mergeAssignee(core);

            out.push(assignee);

            return out;
        }, []);

        if (source)
            K.deletesInserts(source, list_new);

        return list_new;
    }
    /////
    ///// Cards
    /////
    mergeCard (core, source) {
        const index = this._indexes.cards;

        let card = index.get(core.id);

        if (card) {
            card.set(core);
        } else {
            card = new model.Card(core);
            index.add(card);
        }

        if (source)
            K.deletesInsert(source, card);

        if (core.column)
            this.mergeColumn(core.column, card);

        return card;
    }
    mergeCards (list, source) {
        if (!list || list.length===0)
            return [];

        const list_new = list.reduce((out, core)=> {
            const card = this.mergeCard(core);

            out.push(card);

            return out;
        }, []);

        if (source)
            K.deletesInserts(source, list_new);

        return list_new;
    }
    /////
    ///// Column
    /////
    mergeColumn (core, source) {
        const index = this._indexes.columns;

        let column = index.get(core.id);

        if (column) {
            column.set(core);
        } else {
            column = new model.Column(core);
            index.add(column);
        }

        if (source)
            K.deletesInsert(source, column);

        if (core.project)
            this.mergeProject(core.project, column);

        return column;
    }
    /////
    ///// Project
    /////
    mergeProject (core, source) {
        const index = this._indexes.projects;

        let project = index.get(core.id);

        if (project) {
            project.set(core);
        } else {
            project = new model.Project(core);
            index.add(project);
        }

        if (source)
            K.deletesInsert(source, project);

        return project;
    }
    /////
    ///// Issue
    /////
    mergeIssue (core) {
        const index = this._indexes.issues;

        let issue = index.get(core.id);

        if (issue) {
            issue.set(core);
        } else {
            issue = new model.Issue(core);
            index.add(issue);
        }

        // array
        if (core.labels && core.labels.nodes.length>0)
            this.mergeLabels(core.labels.nodes, issue);

        if (core.assignees && core.assignees.nodes.length>0)
            this.mergeAssignees(core.assignees.nodes, issue);

        if (core.projectCards && core.projectCards.nodes.length>0)
            this.mergeCards(core.projectCards.nodes, issue);

        // obj
        // console.log(core.milestone);
        // console.log(core.repository);

        return issue;
    }
    mergeIssues (list) {
        return list.reduce((out, core)=> {
            const issue = this.mergeIssue(core);

            out.push(issue);

            return out;
        }, []);
    }
}


const GRAPH = new Graph();

export default GRAPH;
