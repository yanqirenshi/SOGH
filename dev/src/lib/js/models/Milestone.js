import GraphQLNode from '../GraphQLNode.js';

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
    constructor (data) {
        super(data);

        this._data = data;
    }
}
