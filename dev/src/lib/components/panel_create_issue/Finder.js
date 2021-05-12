import React, { useState } from 'react';

import Item from './finder/Item.js';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    list: {
        marginTop:5,
        flexGrow:1,
        overflow:'auto',
    },
};

function item (d, props) {
    return (
        <Item key={d.id}
              data={d}
              selected={props.selected}
              type={props.type}
              callbacks={props.callbacks}/>
    );
}

function applyFilter (filter, list) {
    if (!filter)
        return list;

    const f = filter.toUpperCase();

    const val = (d) =>  !d ? '' : (d + '').toUpperCase();

    return list.filter(d => {
        return val(d.id).indexOf(f)>-1
            || val(d.title).indexOf(f)>-1
            || val(d.login).indexOf(f)>-1;
    });
}

export default function Finder (props) {
    const [filter, setFilter] = useState(null);

    const list = props.contents.list.sort((a,b)=>a.updatedAt<b.updatedAt ? 1 : -1);

    const change = (e) => {
        const str = e.target.value;
        setFilter(str.length > 0 ? str : null);
    };

    return (
        <div style={style}>
          <div style={{marginTop:5}}>
            <input className="input is-small"
                   type="text"
                   placeholder="Search"
                   onKeyUp={change} />
          </div>

          <div style={style.list}>
            {applyFilter(filter, list).map(d=>item(d, props))}
          </div>
        </div>
    );
}
