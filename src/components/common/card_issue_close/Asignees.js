import React from 'react';

export default function Asignees (props) {
    const sogh = props.sogh;
    const viewer = sogh._viewer;

    const assignees = props.issue.assignees.nodes.filter(d => d.id!==viewer.id);

    if (assignees.length===0)
        return null;

    const style = {
        root: {
            fontSize:12,
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
        },
        name: {
            color: '#333',
        },
    };

    if (!assignees)
        return null;

    return assignees.map(d => {
        return (
            <div key={d.id} style={style.root}>
              <a href={d.url} target="_blank" rel="noreferrer">
                <p key={d.id} style={style.name}>
                  {d.name || d.login}
                </p>
              </a>
            </div>
        );
    });
}
