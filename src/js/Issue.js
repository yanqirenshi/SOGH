// import Column from './Column.js';
// import Label  from './Label.js';

import GraphQLNode from './GraphQLNode.js';

export default class Issue extends GraphQLNode {
    constructor (data) {
        super(data);

        this._data = data;
    }
    getPointResultsFromBody (body) {
        const rs = /\$Point.[R|r]esult:*\s+(\S+)\s+(\d+-\d+-\d+)\s+(\d+)/g;
        const regex = new RegExp(rs);

        const result = [...body.matchAll(regex)];

        if (result.length===0)
            return null;

        return result.reduce((ht, d)=>{
            const parson = d[1];
            const date = d[2];
            const point = d[3] *1;

            ht.total += point;
            ht.details.push({parson: parson, date: date, point: point});

            return ht;
        }, { total: 0, details: [] });
    }
    getPointFromBody (body) {
        const plan = /.*[@|$]Point\.Plan:*\s+(\d+).*/.exec(body);
        const result = /.*[@|$]Point\.Result:*\s+(\d+).*/.exec(body);
        const results = this.getPointResultsFromBody(body);

        return {
            plan:   plan ? plan[1] * 1 : null,
            result: result ? result[1] * 1 : null,
            results : results,
        };
    }
    getDueDateFromBody (body) {
        const a = /.*[@|$]Date\.Due:*\s+(\d+-\d+-\d+).*/.exec(body);

        if (a) return a[1];

        const b = /.*[@|$]Due\.Date:*\s+(\d+-\d+-\d+).*/.exec(body);

        if (b) return b[1];

        return null;
    };
    getNextActionFromBody (body) {
        const next_action = /.*[@|$]Date\.Next:*\s+(\d+-\d+-\d+).*/.exec(body);
        return next_action ? next_action[1] : null;;
    }
    getOwnerFromBody (body) {
        const owner = /.*\$[O|o]wner:\s+(\S+).*/.exec(body);
        return owner ? owner[1] : null;
    }
    addAnotetionValue (issue) {
        issue.point = this.getPointFromBody(issue.body);
        issue.due_date = this.getDueDateFromBody(issue.body);
        issue.date_next_action = this.getNextActionFromBody(issue.body);
        issue.owner = this.getOwnerFromBody(issue.body);

        return issue;
    }
    // for create form
    makeIssueData () {
        return {
            repository: null,
            title: '',
            description: '',
            projects: [],
            milestone: null,
            labels: [],
            assignees: [],
        };
    }
    issueData2requestData (data) {
        const id = (d) => {
            if ((typeof d)==='string')
                return d;
            return d.id;
        };

        const ids = (l) => l.map(d=>id(d));


        return {
            repositoryId: data.repository.id,
            title:        data.title,
            body:         data.description,
            projectIds:   ids(data.projects),
            milestoneId:  data.milestone ? id(data.milestone) : null,
            labelIds:     ids(data.labels),
            assigneeIds:  ids(data.assignees),
        };
    }
}
