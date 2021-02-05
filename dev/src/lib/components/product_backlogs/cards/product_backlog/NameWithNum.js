import React from 'react';

export default function NameWithNum (props) {
    const project = props.project;

    return (
        <div style={props.style}>
          {project.title}

          <span style={{marginLeft:8}}>
            (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.number}
            </a>
            )
          </span>
        </div>
    );
}
