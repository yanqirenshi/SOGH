import React from 'react';


function className (data, selected) {
    const out_base = 'button is-small';
    const out_selected = out_base + ' is-info';

    if (selected===null)
        return out_base;

    if (Array.isArray(selected)) {
        if (!selected.find(d => d.id===data.id))
            return out_base;

        return out_selected;
    }

    if (selected.id!==data.id)
        return out_base;

    return out_selected;
}

export default function Item (props) {
    const data = props.data;
    const selected = props.selected;
    const type = props.type;
    const callback = props.callbacks.change[type];

    const click = () => callback && callback(data);

    return (
        <button key={data.id}
                style={{width: '100%', textAlign: 'left', whiteSpace: 'normal', height: 'auto'}}
                className={className(data, selected)}
                onClick={click}>
          {data.title || data.login || '???'}
        </button>
    );
}
