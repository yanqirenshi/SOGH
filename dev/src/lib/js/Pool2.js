export default class Pool2 {
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
        const id = data.id();

        if (pool.ht[id])
            return;

        pool.ht[id] = data;
        pool.list.push(data);
    }
}
