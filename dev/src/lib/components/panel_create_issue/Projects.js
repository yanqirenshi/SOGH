import React, { useState } from 'react';

import Project from '../../js/Project.js';

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
    },
};

function marker (d) {
    const color = PROJECT.colorByPriority(d.priority);
    const style = {
        width: 6,
        minWidth: 6,
        background : color.background,
        marginRight: 6,
        borderRadius: 2,
    };

    return (
        <div style={style} data_id={d.id} />
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

function itemStyle (project, selected_projects) {
    const slected = selected_projects.find(d=>d===project.id);

    return {
        padding: '4px 6px',
        fontSize: 14,
        color: slected ? 'rgb(162, 32, 65)' : '#333',
        background: '#fff',
        marginBottom: 3,
        border: slected ? '1px solid rgb(162, 32, 65)' : '1px solid #dddddd',
        borderRadius: 3,
        display: 'flex',
    };
}

function split (selected, list) {
    if (selected.length===0)
        return { selected: [], un_selected: list };

    return list.reduce((out, d)=> {
        if (selected.find(id=>id===d.id))
            out.selected.push(d);
        else
            out.un_selected.push(d);

        return out;
    }, { selected: [], un_selected: [] });
};

export default function Projects (props) {
    const [keyword, setKeyword] = useState('');

    const data = props.source;
    const callback = props.callback;

    const change = (e) => setKeyword(e.target.value);

    const click = (e) => {
        const data_id = e.target.getAttribute('data_id');
        const new_data = {...data};

        const new_projects = [];
        let exist = false;
        for (const project_id of new_data.projects) {
            if (project_id===data_id)
                exist = true;
            else
                new_projects.push(project_id);
        }

        if (!exist)
            new_projects.push(data_id);

        new_data.projects = new_projects;

        callback(new_data);
    };

    const projects_filterd = filtering(keyword, props.projects.list);
    const selected_projects = data.projects;

    const x = split(selected_projects, projects_filterd);

    return (
        <div style={style}>
          <div>
            {x.selected.map(d=>{
                return (
                    <div key={d.id}
                         style={itemStyle(d, selected_projects)}
                         data_id={d.id}
                         onClick={click}>
                      {marker(d)}
                      {d.name}
                    </div>
                );
            })}
          </div>

          <div style={style.search}>
            <input className="input is-small"
                   type="text"
                   placeholder="Filter"
                   value={keyword}
                   onChange={change} />
          </div>

          <div style={style.list}>
            <div style={style.list.container}>
            {x.un_selected.map(d=>{
                return (
                    <div key={d.id}
                         style={itemStyle(d, selected_projects)}
                         data_id={d.id}
                         onClick={click}>
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
