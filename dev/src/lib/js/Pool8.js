export default class Pool8 {
    constructor () {
        this._ht = {};
        this._list = [];
    }
    // list2Pool (list) {
    //     const reducer = (ht,d)=> {
    //         ht[d.id()] = d;
    //         return ht;
    //     };

    //     return {
    //         ht: list.reduce(reducer,{}),
    //         list: list,
    //     };
    // }
    get (id) {
        return this._ht[id];
    }
    add (data) {
        const id = data.id();

        if (this._ht[id])
            return;

        this._ht[id] = data;
        this._list.push(data);
    }
}
