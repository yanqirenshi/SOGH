import GraphQLNode from '../GraphQLNode.js';
import moment from 'moment';

// id
// number
// url
// title
// state
// dueOn
// description
// createdAt
// updatedAt
// closedAt
// issues	model

export default class Milestone extends GraphQLNode {
    // constructor (data) {
    //     super(data);
    // }
    title () {
        return this._core.title || null;
    }
    url () {
        return this._core.url || null;
    }
    number () {
        return this._core.number || null;
    }
    state () {
        return this._core.state || null;
    }
    description () {
        return this._core.description || null;
    }
    closedAt () {
        return this._core.closedAt || null;
    }
    dueOn () {
        return this._core.dueOn || null;
    }
    term () {
        const regex = /^.*(\d{4}-\d{2}-\d{2})\s+〜\s+(\d{4}-\d{2}-\d{2})$/;

        const ret = this.title().trim().match(regex);

        const from = this.str2moment(ret[1]);
        const to = this.str2moment(ret[2]);

        if (!from || !to || to.isBefore(from))
            return null;

        return {
            from: from.format('YYYY-MM-DD'),
            to: to.format('YYYY-MM-DD'),
        };
    }
    isInTerm (str) {
        const term = this.term();

        if (!term)
            return false;

        const m = this.str2moment(str);

        if (!m)
            return false;

        return m.isSameOrAfter(term.from) && m.isSameOrBefore(term.to);
    }
    str2moment (str) {
        if (!str) return null;

        const m = moment(str);

        if (!m.isValid()) return null;

        return m;
    }
}
