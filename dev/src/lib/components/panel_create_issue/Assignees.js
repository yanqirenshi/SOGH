import React, { useState } from 'react';

import Assignee from './Assignee.js';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    paddingTop: 3,
};

function filtering (keyword, list) {
    if (keyword.trim()==='')
        return list;

    const k = keyword.toUpperCase();

    return list.filter(d=>{
        const name = d.name() || d.login();
        return name.toUpperCase().includes(k);
    });
}

function isActive (label, selected_assignees) {
    return selected_assignees.find(d=>d===label.id());
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

export default function Assignees (props) {
    const [keyword, setKeyword] = useState('');

    const data = props.source;
    const callback = props.callback;

    const change = (e) => setKeyword(e.target.value);

    const click = (e) => {
        const data_id = e.target.getAttribute('data_id');
        const new_data = {...data};

        const new_assignees = [];
        let exist = false;
        for (const label_id of new_data.assignees) {
            if (label_id===data_id)
                exist = true;
            else
                new_assignees.push(label_id);
        }

        if (!exist)
            new_assignees.push(data_id);

        new_data.assignees = new_assignees;

        callback(new_data);
    };

    const assignees_filterd = filtering(keyword, props.assignees.list);
    const selected_assignees = data.assignees;

    const x = split(selected_assignees, assignees_filterd);

    const list = [].concat(x.selected).concat(x.un_selected);

    return (
        <div style={style}>
          <input className="input is-small"
                 style={{width:222, marginRight:3,marginBottom:3}}
                 type="text"
                 placeholder="Filter"
                 value={keyword}
                 onChange={change} />

          {list.map(d=>{
              return (
                  <Assignee key={d.id()}
                            assignee={d}
                            selected={isActive(d, selected_assignees)}
                            callback={click}/>
              );
          })}
        </div>
    );
}
