import React from 'react';

function marker (d) {
    const style = {
        width: 6,
        minWidth: 6,
        background : '#' + d.color(),
        marginRight: 6,
        borderRadius: 2,
    };

    return (
        <div style={style} data_id={d.id()} />
    );
}

function itemStyle (label, selected) {
    return {
        padding: '4px 6px',
        fontSize: 14,
        color: selected ? 'rgb(162, 32, 65)' : '#333',
        background: '#fff',
        marginBottom: 3,
        border: selected ? '1px solid rgb(162, 32, 65)' : '1px solid #dddddd',
        borderRadius: 3,
        display: 'flex',
    };
}

export default function Label (props) {
    const d = props.label;
    const selected = props.selected;
    const callback = props.callback;

    const click = (e) => {callback && callback(e);};

    const label_id = d.id();

    return (
        <div key={label_id}
             style={itemStyle(d, selected)}
             data_id={label_id}
             onClick={click}>
          {marker(d)}
          {d.name()}
        </div>
    );
}
