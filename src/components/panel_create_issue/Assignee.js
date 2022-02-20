import React from 'react';

function itemStyle (label, selected) {
    return {
        color: selected ? 'rgb(162, 32, 65)' : '#333',
        background: '#fff',
        border: selected ? '1px solid rgb(162, 32, 65)' : '1px solid #dddddd',
        borderRadius: 3,
        marginRight: 3,
        marginBottom: 3,
        padding: '3px 6px',
        fontSize: 14,
    };
}

export default function Assignee (props) {
    const d = props.assignee;
    const selected = props.selected;
    const callback = props.callback;

    const assignee_id = d.id();

    const click = (e) => {callback && callback(e);};

    return (
        <div style={itemStyle(d, selected)}
             data_id={assignee_id}
             onClick={click}>
          {d.name() || d.login()}
        </div>
    );
}
