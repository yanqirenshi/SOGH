import React from 'react';

function itemStyle (project, selected) {
    return {
        padding: '4px 6px',
        fontSize: 14,
        color: selected ? 'rgb(162, 32, 65)' : '#333',
        background: '#fff',
        marginBottom: 3,
        border: selected ? '1px solid rgb(162, 32, 65)' : '1px solid #dddddd',
        borderRadius: 3,
        display: 'flex',
    };
}

function marker (project) {
    const color = project.colorByPriority();

    const style = {
        width: 6,
        minWidth: 6,
        background : (color && color.background) ? color.background : 'none',
        marginRight: 6,
        borderRadius: 2,
    };

    return (
        <div style={style} data_id={project.id()} />
    );
}

export default function Project (props) {
    const project = props.project;
    const selected = props.selected;
    const callback = props.callback;

    const project_id = project.id();

    const click = (e) => {callback && callback(e);};

    return (
        <div style={itemStyle(project, selected)}
             data_id={project_id}
             onClick={click}>
          {marker(project)}
          {project.name()}
        </div>
    );
}
