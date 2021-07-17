const WBS01 = [
    {
        _id: 100, _parent: 1,
        order: 10,
        label: 'Classes',
    },
];

const WBS02 = [
    {
        _id: 10000, _parent: 100,
        order: 10,
        label: 'DAO',
    },
    {
        _id: 10001, _parent: 100,
        order: 10,
        label: 'API',
    },
    {
        _id: 10002, _parent: 100,
        order: 10,
        label: 'Component Core',
    },
    {
        _id: 10003, _parent: 100,
        order: 10,
        label: 'Utility',
    },
];

function buildWbs () {
    const addClass = (d) => {
        d._class = 'WBS';
        return d;
    };

    return [...WBS01, ...WBS02].map(addClass);
}

const WBS = buildWbs();

export default WBS;
