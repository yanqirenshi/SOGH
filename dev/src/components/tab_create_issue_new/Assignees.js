import React, { useState } from 'react';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    paddingTop: 3,
    item: {
        background: '#eee',
        border: '1px solid #dddddd',
        borderRadius: 3,
        marginRight: 3,
        marginBottom: 3,
        padding: '3px 6px',
        fontSize: 14,
    }
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

export default function Assignees (props) {
    const [keyword, setKeyword] = useState('');

    const change = (e) => setKeyword(e.target.value);

    const assignees_filterd = filtering(keyword, props.source.list);

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
                  <div key={d.id} style={style.item}>
                    {d.title || d.login}
                  </div>
              );
          })}
        </div>
    );
}
