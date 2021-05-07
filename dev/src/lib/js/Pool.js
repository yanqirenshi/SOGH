export default class Pool {
    list2Pool (list, key="id") {
        const reducer = (ht,d)=> {
            ht[d[key]] = d;
            return ht;
        };

        return {
            ht: list.reduce(reducer,{}),
            list: list,
        };
    }
    addPool (data, pool) {
        if (pool.ht[data.id])
            return;

        data.issues = [];

        pool.ht[data.id] = data;
        pool.list.push(data);
    }
}
