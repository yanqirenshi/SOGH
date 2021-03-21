import React from 'react';

export default function Asignees (props) {
    const assignees = props.issue.assignees.nodes;

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
