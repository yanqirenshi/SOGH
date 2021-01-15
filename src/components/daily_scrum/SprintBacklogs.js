import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import SprintBacklogsTable from './SprintBacklogsTable.js';

export default function SprintBacklogs (props) {
    const project = props.project;

    return (
        <nav className="panel">
          <p className="panel-heading" style={{fontSize:14}}>
            <a href={project.url}>
              <FontAwesomeIcon style={{}} icon={faExternalLinkAlt} />
            </a>
            {project.name}
          </p>

          <div className="panel-block">
            <SprintBacklogsTable project={project}/>
          </div>
        </nav>
    );
}
