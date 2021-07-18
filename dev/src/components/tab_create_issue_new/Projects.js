import React, { useState } from 'react';

import Project from '../../lib/js/Project.js';

const PROJECT = new Project();

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    search: {
        paddingBottom: 3,
    },
    list: {
        flexGrow: 1,
        position: 'relative',
        container: {
            position: 'absolute',
            overflow: 'auto',
            width:'100%',
            height: '100%',
            border: '1px solid #ddd',
            padding: 3,
        },
        item: {
            padding: '4px 6px',
            fontSize: 14,
            background: '#eee',
            marginBottom: 3,
            border: '1px solid #dddddd',
            borderRadius: 3,
            display: 'flex',
        },
    },
};

function marker (d) {
    const color = PROJECT.colorByPriority(d.priority);
    const style = {
        width: 6,
        background : color.background,
        marginRight: 6,
        borderRadius: 2,
    };

    return (
        <div style={style}/>
    );
}

function filtering (keyword, list) {
    if (keyword.trim()==='')
        return list;

    const k = keyword.toUpperCase();

    return list.filter(d=>{
        const name = d.name;
        return name.toUpperCase().includes(k);
    });
}

export default function Projects (props) {
    const [keyword, setKeyword] = useState('');

    const change = (e) => setKeyword(e.target.value);

    const projects_filterd = filtering(keyword, props.source.list);

    return (
        <div style={style}>
          <div style={style.search}>
            <input className="input is-small"
                   type="text"
                   placeholder="Filter"
                   value={keyword}
                   onChange={change} />
          </div>

          <div style={style.list}>
            <div style={style.list.container}>
            {projects_filterd.map(d=>{
                return (
                    <div key={d.id}
                         style={style.list.item}>
                      {marker(d)}
                      {d.name}
                    </div>
                );
            })}
            </div>
          </div>
        </div>
    );
}
