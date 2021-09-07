export default class GraphQLNode {
    constructor (data) {
        this._core = data;
    }
    id () {
        return this._core.id;
    }
    createdAt () {}
    updatedAt () {}
}
