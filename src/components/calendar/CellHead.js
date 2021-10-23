import React from 'react';

function weekColor (date) {
    if (date.day()===0)
        return '#ec6d71';

    if (date.day()===6)
        return '#4c6cb3';

    return '#888';
}

function dayStyle (data) {
    const is_today = data.is_today;

    return {
        fontWeight: is_today ? 'bold' : null,
        color: is_today ? '#b7282e' : null,
    };
}

export default function CellHead (props) {
    const data = props.data;
    const tasks = props.tasks;

    const style = {
        fontSize: 14,
        display: 'flex',
        justifyContent: 'center',
        day: dayStyle(data),
        week: {
            marginLeft: 6,
            color: weekColor(data.date),
        },
        tasks: {
            marginLeft: 6,
        }
    };

    return (
          <div style={style}>

            <p style={style.day}>
              {data.date.format('DD')}
            </p>

            <p style={style.week}>
              {data.date.format('ddd')}
            </p>

            {tasks.length>0
             && (
                 <p style={style.tasks}>
                   ({tasks.length})
                 </p>
             )}
          </div>
    );
}
