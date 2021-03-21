import React from 'react';

export default function Project (props) {
    const cards = props.issue.projectCards.nodes;

    if (cards.length===0)
        return null;

    const style = {
        root: {
            fontSize:12,
            paddingLeft:11,
            paddingRight: 11
        },
        name: {
            color: '#333'
        },
    };

    const project = cards[0].column.project;

    return (
        <div style={style.root}>
          <a href={project.url} target="_blank" rel="noreferrer">
            <p style={style.name}>
              {project.name}
            </p>
          </a>
        </div>
    );
}
