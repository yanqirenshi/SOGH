export default class SoghChild {
    constructor (token) {
        this._sogh = null;
    }
    sogh () { return this._sogh; }
    viewer () {
        return this._sogh.viewer();
    }
}
