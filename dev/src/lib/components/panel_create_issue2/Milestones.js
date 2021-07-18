import React, { useState } from 'react';

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
        const name = d.title;
        return name.toUpperCase().includes(k);
    });
}


function itemStyle (mailestone, selected_milestone) {
    const slected = selected_milestone && selected_milestone===mailestone.id;

    return {
        color: slected ? 'rgb(162, 32, 65)' : '#333',
        background: '#fff',
        border: slected ? '1px solid rgb(162, 32, 65)' : '1px solid #dddddd',
        borderRadius: 3,
        marginRight: 3,
        marginBottom: 3,
        padding: '3px 6px',
        fontSize: 14,
    };
}

export default function Milestones (props) {
    const [keyword, setKeyword] = useState('');

    const data = props.source;
    const callback = props.callback;

    const change = (e) => setKeyword(e.target.value);

    const milestones_filterd = filtering(keyword, props.milestones.list);
    const selected_milestone = data.milestone;

    const click = (e) => {
        const data_id = e.target.getAttribute('data_id');
        const new_data = {...data};

        if (new_data.milestone===null || new_data.milestone!==data_id)
            new_data.milestone = data_id;
        else
            new_data.milestone = null;

        callback(new_data);
    };

    return (
        <div style={style}>
          <input className="input is-small"
                 style={{width:222, marginRight:3,marginBottom:3}}
                 type="text"
                 placeholder="Filter"
                 value={keyword}
                 onChange={change} />

          {milestones_filterd.map(d=>{
              return (
                  <div key={d.id}
                       style={itemStyle(d, selected_milestone)}
                       data_id={d.id}
                       onClick={click}>
                    {d.title}
                  </div>
              );
          })}
        </div>
    );
}
