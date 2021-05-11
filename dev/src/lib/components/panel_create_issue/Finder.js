import React from 'react';

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
              type={props.type}
              callbacks={props.callbacks}/>
    );
}

export default function Finder (props) {
    console.log('d2-2-1');
    const list = props.contents.list.sort((a,b)=>a.updatedAt<b.updatedAt ? 1 : -1);
    console.log('d2-2-2');

    return (
        <div style={style}>
          <div style={{marginTop:5}}>
            <input className="input is-small" type="text" placeholder="Search" />
          </div>

          <div style={style.list}>
            {list.map(d=>item(d, props))}
          </div>
        </div>
    );
}
