import React from 'react';

import CellHead from './CellHead.js';
import CellBody from './CellBody.js';

function cellBackground (data) {
    if (data.is_selected)
        return 'rgb(255,255,234)';

    if (data.is_this_month)
        return '#fff';

    return '#f6f6f6';
}

export default function Cell (props) {
    const data = props.data;
    const w = props.w;
    const h = props.h;
    const callback = props.callback;

    const style = {
        width: w || 0,
        height: h || 0,
        float: 'left',
        background: cellBackground(data),
        border: '0.5px solid #eee',
        borderTop: `0.5px solid ${data.is_work ? '#38b48b' : '#eee'}`,
        display: 'flex',
        flexDirection: 'column',
    };

    const tasks = props.tasks[data.date.format('YYYY-MM-DD')] || [];

    const click = () => callback(data);

    return (
        <div style={style} onClick={click}>
          <CellHead data={data} tasks={tasks}/>
          <CellBody tasks={tasks}/>
        </div>
    );
}
