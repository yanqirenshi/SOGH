import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Cell from './calendar/Cell.js';

function makeCalendarDay (month, today, selected, date) {
    const eq_month = true
          && month.year()===date.year()
          && month.month()===date.month();

    const eq_today = true
          && date.year()  === today.year()
          && date.month() === today.month()
          && date.date()  === today.date();

    return {
        date: moment(date),
        is_today: eq_today,
        is_this_month: eq_month,
        is_selected: selected===null ? false : selected.isSame(date),
        is_work: false,
    };
}

function makeCalendarWeek (month, today, selected, day) {
    const week = [];

    for (let i=0 ; i<7 ; i++) {
        week.push(makeCalendarDay(month, today, selected, day));
        day.add(1, 'd');
    }

    return week;
}

function makeCalendarData (month = moment().startOf('month'), today = moment().startOf('date'), selected) {
    const start = moment(month).startOf('week');
    const end   = moment(month).endOf("month").endOf("week");

    const calendar = [];

    const day = moment(start);

    do calendar.push(makeCalendarWeek(month, today, selected, day)); while (day.isSameOrBefore(end));

    return calendar;
}

function tasks2tasks (list) {
    return list.reduce((ht, d)=> {
        const date = moment(d.date).format('YYYY-MM-DD');

        if (!ht[date])
            ht[date] = [];

        ht[date].push(d);

        return ht;
    }, {});
}

export default function Calendar (props) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [tasks, setTasks] = useState({});

    const month = props.month;
    const today = props.today;

    const w = props.w || 600;
    const h = props.h || 500;

    const style_root = {
        w: w,
        h: h,
        background: '#fff',
        display: 'float',
    };

    useEffect(() => setTasks(tasks2tasks(props.tasks)), [props.tasks]);

    useEffect(() => setData(makeCalendarData(month, today, selected)), [month, today, selected]);

    const col_num = 7;
    const row_num = data.length;

    const cell_w = w / col_num;
    const cell_h = h / row_num;

    const click = (data)=> {
        if (selected!==null && selected.isSame(data.date))
            setSelected(null);
        else
            setSelected(moment(data.date));
    };

    return (
        <div style={style_root}>
          {data.map((row, i)=> {
              return row.map((cell,k)=> {
                  return (
                      <Cell key={i+'-'+k}
                            w={cell_w}
                            h={cell_h}
                            data={cell}
                            tasks={tasks}
                            callback={click} />
                  );
              });
          })}
        </div>
    );
}
