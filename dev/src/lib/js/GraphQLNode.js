export default class GraphQLNode {
    constructor (data) {
        this._core = data;
    }
    core (v) {
        if (arguments.length===1)
            this._core = v;

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
}
