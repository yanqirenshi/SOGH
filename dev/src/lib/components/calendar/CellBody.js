import React from 'react';

import Task from './Task.js';

import './Cell.css';

export default function CellBody (props) {
    const tasks = props.tasks;

    const style = {
        flexGrow: 1,
        overflow: 'auto',
        paddingLeft: 8,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'center',
    };

    return (
        <div className="calendar-cell-hide-scroll"
             style={style}>

          {tasks.map((d,i)=> <Task key={i} task={d}/>)}
        </div>
    );
}
