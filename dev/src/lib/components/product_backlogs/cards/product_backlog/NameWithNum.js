import React from 'react';

import ANewTab from '../../../common/ANewTab.js';

export default function NameWithNum (props) {
    const project = props.project;

    return (
        <div style={props.style}>
          {project.title}

          <span style={{marginLeft:8}}>
            (
            <ANewTab to={project.url}>
              {project.number}
            </ANewTab>
            )
          </span>
        </div>
    );
}
