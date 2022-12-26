import React, { useState } from 'react';

import Project from './Project.js';

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
            {sort(x.selected).map(project=>{
                return (
                    <Project project={project}
                             callback={click}
                             selected={isSelected(project, selected_projects)}/>
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
              {sort(x.un_selected).map(project=>{
                  return (
                      <Project key={project.id()}
                               project={project}
                               callback={click}
                               selected={isSelected(project, selected_projects)}/>
                  );
              })}
            </div>
          </div>
        </div>
    );
}

function filtering (keyword, list) {
    if (keyword.trim()==='')
        return list;

    const k = keyword.toUpperCase();

    return list.filter(d=>{
        const name = d.name();
        return name.toUpperCase().includes(k);
    });
}

function isSelected (project, selected_projects) {
    return selected_projects.find(d=>d===project.id()) ? true : false;
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

function sort (projects) {
    const x = projects.reduce((ht,project)=> {
        if (project.state()==='OPEN')
            ht['OPEN'].push(project);
        else
            ht['CLOSED'].push(project);

        return ht;
    }, { OPEN: [], CLOSED: []});

    const sorter = (a,b)=> a.name()<b.name() ? -1 : 1;

    return [
        ...x['OPEN'].sort(sorter),
        ...x['CLOSED'].sort(sorter),
    ];
}
