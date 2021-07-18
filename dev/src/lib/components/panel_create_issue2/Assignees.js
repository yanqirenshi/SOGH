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
        const name = d.title || d.login;
        return name.toUpperCase().includes(k);
    });
}

function itemStyle (label, selected_assignees) {
    const slected = selected_assignees.find(d=>d===label.id);

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

    return (
        <div style={style}>
          <input className="input is-small"
                 style={{width:222, marginRight:3,marginBottom:3}}
                 type="text"
                 placeholder="Filter"
                 value={keyword}
                 onChange={change} />

          {assignees_filterd.map(d=>{
              return (
                  <div key={d.id}
                       style={itemStyle(d, selected_assignees)}
                       data_id={d.id}
                       onClick={click}>
                    {d.title || d.login}
                  </div>
              );
          })}
        </div>
    );
}
