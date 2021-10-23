import React, { useState } from 'react';
import moment from 'moment';

import {Calendar} from '../lib/index.js';

const w = 900;
const h = 600;

const style = {
    month: {
        marginTop: 66,
        display: 'flex',
        justifyContent: 'center',
        contents: {
            textAlign: 'center',
        },
    },
    base: {
        width: w + (22 * 2),
        height: h + (22 * 2),
        padding:22,
        background: '#eee',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 8,
    },
};

export default function TabCalendar (props) {
    const [month, setMonth] = useState(moment().startOf('month'));
    const [today] = useState(moment().startOf('day'));

    const back = ()=> setMonth(moment(month).add(-1,'M'));
    const forward = ()=> setMonth(moment(month).add(1,'M'));

    return (
        <div style={style}>
          <div style={style.month}>
            <button className="button is-small"
                    onClick={back}>
              ←
            </button>
            <p style={style.month.contents}>
              {month.format('YYYY-MM-DD')}
            </p>
            <button className="button is-small"
                    onClick={forward}>
              →
            </button>
          </div>
          <div style={style.base}>
            <Calendar  w={w} h={h}
                       month={month}
                       today={today}
                       tasks={tasks}/>
          </div>
        </div>
    );
}

const tasks = [
    { date: '2021-10-23', name: 't1-01', description: '', url: 'https://www.google.com/' },
    { date: '2021-10-23', name: 't1-02', description: '', url: null },
    { date: '2021-10-23', name: 't1-03', description: '', url: null },
    { date: '2021-10-23', name: 't1-04', description: '', url: null },
    { date: '2021-10-23', name: 't1-05', description: '', url: null },
    { date: '2021-10-23', name: 't1-06', description: '', url: null },
    { date: '2021-10-23', name: 't1-07', description: '', url: null },
    { date: '2021-10-23', name: 't1-08', description: '', url: null },
    { date: '2021-10-23', name: 't1-09', description: '', url: null },
    { date: '2021-10-23', name: 't1-10', description: '', url: null },
    { date: '2021-10-23', name: 't1-11', description: '', url: null },
    { date: '2021-10-23', name: 't1-12', description: '', url: null },
    { date: '2021-10-24', name: 'task2', description: '', url: null },
    { date: '2021-09-29', name: 'task3', description: '', url: null },
];
