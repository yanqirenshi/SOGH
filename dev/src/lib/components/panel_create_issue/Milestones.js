import React, { useState } from 'react';

import Milestone from './Milestone.js';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    paddingTop: 3,
};

export default function Milestones (props) {
    const [keyword, setKeyword] = useState('');

    const data = props.source;
    const callback = props.callback;

    const change = (e) => setKeyword(e.target.value);

    const click = (e) => {
        const data_id = e.target.getAttribute('data_id');
        const new_data = {...data};

        if (new_data.milestone===null || new_data.milestone!==data_id)
            new_data.milestone = data_id;
        else
            new_data.milestone = null;

        callback(new_data);
    };

    const milestones_filterd = filtering(keyword, props.milestones.list);
    const selected_milestone = data.milestone;

    const x = split([selected_milestone], milestones_filterd);

    const list = [].concat(x.selected).concat(x.un_selected.sort((a,b)=> {
        return a.dueOn() < b.dueOn() ? -1 : 1;
    }));

    return (
        <div style={style}>
          <input className="input is-small"
                 style={{width:222, marginRight:3,marginBottom:3}}
                 type="text"
                 placeholder="Filter"
                 value={keyword}
                 onChange={change} />

          {list.map(milestone=>{
              return (
                  <Milestone key={milestone.id()}
                             milestone={milestone}
                             selected={isSelected(milestone, selected_milestone)}
                             callback={click}/>
              );
          })}
        </div>
    );
}

function filtering (keyword, list) {
    if (keyword.trim()==='')
        return list;

    const k = keyword.toUpperCase();

    return list.filter(d=>{
        const name = d.title();
        return name.toUpperCase().includes(k);
    });
}

function isSelected (mailestone, selected_milestone) {
    return selected_milestone && selected_milestone===mailestone.id();
}

function split (selected, list) {
    if (selected.length===0)
        return { selected: [], un_selected: list };

    return list.reduce((out, d)=> {
        if (selected.find(id=>id===d.id()))
            out.selected.push(d);
        else
            out.un_selected.push(d);

        return out;
    }, { selected: [], un_selected: [] });
};

