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
        order: 15,
        label: 'DAO',
    },
    {
        _id: 10001, _parent: 100,
        order: 80,
        label: 'Library (API)',
    },
    {
        _id: 10002, _parent: 100,
        order: 10,
        label: 'Component Core',
    },
    {
        _id: 10003, _parent: 100,
        order: 90,
        label: 'Utility',
    },
    {
        _id: 10004, _parent: 100,
        order: 5,
        label: 'Component',
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
