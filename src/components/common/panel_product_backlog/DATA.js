import moment from 'moment';

const term = (start, end) => {
    const start_m = moment(start);
    const end_m = moment(end);

    return {
        start: start_m.isValid() ? start_m.toDate() : null,
        end:   end_m.isValid()   ? end_m.toDate()   : null,
    };
};

function wbs () {
    return [
        { id: 10, name: 'WBS 10' },
        { id: 20, name: 'WBS 20' },
        { id: 30, name: 'WBS 30' },
        { id: 40, name: 'WBS 40' },
        { id: 50, name: 'WBS 50' },
        { id: 60, name: 'WBS 60' },
        { id: 70, name: 'WBS 70' },
        { id: 80, name: 'WBS 80' },
        { id: 90, name: 'WBS 90' },
        { id: 99, name: 'WBS 90' },
    ];
}

function workpackages () {
    return [
        { id: 1000, parent: 10, name: 'Task 1000', plan: term('2020-09-01', '2021-09-30'), style: { background: '#c1e4e9' } },
        { id: 1001, parent: 10, name: 'Task 1001', plan: term('2020-10-01', '2020-10-31') },
        { id: 2000, parent: 20, name: 'Task 2000', plan: term('2020-11-01', '2020-11-30') },
        { id: 3000, parent: 30, name: 'Task 3000', plan: term('2020-11-15', '2021-01-31') },
        { id: 4000, parent: 40, name: 'Task 4000', plan: term('2021-01-01', '2021-04-15') },
        { id: 4001, parent: 40, name: 'Task 4001', plan: term('2021-01-01', '2021-04-15') },
        { id: 5000, parent: 50, name: 'Task 5000', plan: term('2021-04-01', '2021-05-31') },
        { id: 5001, parent: 50, name: 'Task 5001', plan: term('2021-04-01', '2021-05-31') },
        { id: 6000, parent: 60, name: 'Task 6000', plan: term('2021-06-01', '2021-07-31') },
        { id: 6001, parent: 60, name: 'Task 6001', plan: term('2021-06-01', '2021-07-31') },
        { id: 7000, parent: 70, name: 'Task 7000', plan: term('2021-06-01', '2021-07-31') },
        { id: 8000, parent: 80, name: 'Task 8000', plan: term('2021-06-01', '2021-07-31') },
        { id: 8001, parent: 80, name: 'Task 8001', plan: term('2021-06-01', '2021-07-31') },
        { id: 8800, parent: 80, name: 'Task 8800', plan: term('2021-08-01', '2021-08-31') },
        { id: 8801, parent: 80, name: 'Task 8801', plan: term('2021-08-01', '2021-08-31') },
        { id: 9000, parent: 90, name: 'Task 9000', plan: term('2020-09-01', '2020-09-30') },
        { id: 9001, parent: 90, name: 'Task 9001', plan: term('2020-10-01', '2020-12-31') },
        { id: 9002, parent: 90, name: 'Task 9002', plan: term('2021-01-01', '2021-01-31') },
        { id: 9003, parent: 90, name: 'Task 9003', plan: term('2021-02-01', '2021-04-30') },
        { id: 9004, parent: 90, name: 'Task 9004', plan: term('2021-02-01', '2021-07-12') },
        { id: 9005, parent: 90, name: 'Task 9005', plan: term('2021-07-13', '2021-11-12') },
        { id: 9006, parent: 90, name: 'Task 9006', plan: term('2021-02-01', '2021-05-31') },
        { id: 9007, parent: 90, name: 'Task 9007', plan: term('2021-09-06', '2021-11-12') },
        { id: 9008, parent: 90, name: 'Task 9008', plan: term('2021-10-18', '2021-11-23') },
        { id: 9900, parent: 99, name: 'Task 9900', plan: term('2020-09-01', '2021-07-31') },
    ];
}

const DATA = {
    scale: {
        // y(years), Q(quarters), M(months), w(weeks), d(days)
        // h(hours), m(minutes), s(seconds), ms(milliseconds)
        // cycle: 'M',
        cycle: 'w',
        w: 222 * 7,
        start: null,
        end: null,
    },
    groups: [],
    wbs: [],
    workpackages: [],
    style: {
        stage: {
            padding: 22,
            background: '#f8f8f8',
        },
        head: {
            h: 111,
            cell: {
                size: { w:0, h:0 },
                color: '#333',
                background: '#fafafa',
            },
            background: '#fff',
            // #546a7b border
            // #747a81 font
        },
        body: {
            row: {
                padding: 33,
                background: '#fff',
            },
            chart: {
                h: 111,
                padding: 11,
                background: '#e0ebaf',
                label: {
                    h: 122,
                    margin: { bottom:10 },
                },
                plan: {
                    h: 111,
                    background: '#e0ebaf',
                },
                result: {
                    h: 111,
                    shift: 22,
                    background: '#eeeeee',
                },
                progress: {
                    h: 111,
                    background: '#f00',
                },
            },
            background: '#fff',
            // #516f79 line
        },
        foot: {
            h: 33,
            background: '#fff',
        },
    }
};

export default DATA;
