export default class GraphQLNode {
    constructor (data) {
        this._core = data;
        this._karma = {};
    }
    core () {
        return this._core;
    }
    id () {
        return this._core.id || null;
    }
    createdAt () {
        return this._core.createdAt || null;
    }
    updatedAt () {
        return this._core.updatedAt || null;
    }
    set (core) {
        return this;
    }
    karma () {
        return this._karma;
    }
}
