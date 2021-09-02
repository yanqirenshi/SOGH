import moment from 'moment';

import GraphQLNode from '../GraphQLNode.js';

// id
// url
// title
// createdAt
// closedAt
// updatedAt
// number
// body
// bodyHTML
// state
// projectCard	model
// milestone	model
// assignees	model
// labels	model

export default class Issue extends GraphQLNode {
    constructor (data) {
        super(data);

        this.regex = {
            point: {
                plan:    /.*[@|$][P|p]oint\.[P|p]lan:*\s+(\d+).*/,
                result:  /.*[@|$][P|p]oint\.[R|r]esult:*\s+(\d+).*/,
                plans:   /\$[P|p]oint.[P|p]lan:*\s+(\S+)\s+(\d+-\d+-\d+)\s+(\d+)/g,
                results: /\$Point.[R|r]esult:*\s+(\S+)\s+(\d+-\d+-\d+)\s+(\d+)/g,
            },
            date_due:    /.*[@|$]Date\.Due:*\s+(\d+-\d+-\d+).*/,
            due_date:    /.*[@|$]Due\.Date:*\s+(\d+-\d+-\d+).*/,
            next_action: /.*[@|$]Date\.Next:*\s+(\d+-\d+-\d+).*/,
            owner:       /.*\$[O|o]wner:*\s+(\S+).*/,
        };

        this._data = data;
    }
    //
    body (v) {
        if (arguments.length===0)
            return this._core.body;

        this._core.body = v || '';

        return this._core.body;
    }
    dueDate (v) {
        const body = this.body();

        if (arguments.length===0 || this.dueDate()===v)
            return this.getDueDateFromBody(body);

        const replacer = () => '$Date.Due ' + (v ? v : 'yyyy-mm-dd');

        if (body.match(/.*[@|$]Date\.Due:*\s+.*/)) {
            const newString = body.replace(/.*[@|$]Date\.Due:*\s+(\S+).*/, replacer);

            this.body(newString);
        } else if (body.match(/.*[@|$]Due\.Date:*\s+.*/)) {
            const newString = body.replace(/.*[@|$]Due\.Date:*\s+(\S+).*/, replacer);

            this.body(newString);
        } else {
            this.body(body + '\n$Date.Due ' + (v ? v : 'yyyy-mm-dd'));
        }

        return this.getDueDateFromBody(body);
    }
    nextActionDate (v) {
        const body = this.body();

        if (arguments.length===0 || this.dueDate()===v)
            return this.getNextActionFromBody(body);

        const replacer = () => '$Date.Next ' + (v ? v : 'yyyy-mm-dd');

        if (body.match(/.*[@|$]Date\.Next:*\s+.*/)) {
            const newString = body.replace(/.*[@|$]Date\.Next:*\s+(\S+).*/, replacer);

            this.body(newString);
        } else {
            this.body(body + '\n$Date.Next ' + (v ? v : 'yyyy-mm-dd'));
        }

        return this.getNextActionFromBody(body);
    }
    //
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
    getPointPlansFromBody (body) {
        const rs = /\$[P|p]oint.[P|p]lan:*\s+(\S+)\s+(\d+-\d+-\d+)\s+(\d+)/g;
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
        const plan = /.*[@|$][P|p]oint\.[P|p]lan:*\s+(\d+).*/.exec(body);
        const result = /.*[@|$][P|p]oint\.[R|r]esult:*\s+(\d+).*/.exec(body);
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
        const owner = /.*\$[O|o]wner:*\s+(\S+).*/.exec(body);
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
            owner: '',
            due_date: moment().add(3, 'd').format('YYYY-MM-DD'),
            next_action_date: moment().add(1, 'd').format('YYYY-MM-DD'),
        };
    }
    issueData2requestDataDescription (data) {
        const description = data.description;

        const pos = description.indexOf('---\n- $');

        const owner = (v) => (!v || v.length===0) ? '???' : v;
        const date = (v) => (!v || v.length===0) ? 'yyyy-mm-dd' : v;

        const x = '\n'
              + `$Owner ${owner(data.owner)}\n`
              + `$Date.Due ${date(data.due_date)}\n`
              + `$Date.Next ${date(data.next_action_date)}\n`;

        if (pos===-1)
            return description + x;

        return description.slice(0, pos+3)
            + x
            + description.slice(pos+3);
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
            body:         this.issueData2requestDataDescription(data),
            projectIds:   ids(data.projects),
            milestoneId:  data.milestone ? id(data.milestone) : null,
            labelIds:     ids(data.labels),
            assigneeIds:  ids(data.assignees),
        };
    }
}
