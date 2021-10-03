import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWindowMinimize, faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";
import ANewTab from './ANewTab.js';

export default function ProductBacklogHeader (props) {
    const project = props.project;
    const project_id = project.id();
    const project_name = project.name();
    const project_number = project.number();

    const clickClose = () => props.callbacks.projects.close(project_id);
    const clickOpen = () => props.callbacks.projects.open(project_id);

    const style_header = {
        ...project.colorByPriority(),
        ...{fontSize:14, display: 'flex'}
    };

    const pb_to = props.productbacklog_url_prefix + project_id;

    return (
        <div className="panel-heading" style={style_header}>
          <div style={{flexGrow:1, display:'flex'}}>
            {project_id
             && <Link to={pb_to} style={{color: 'inherit'}}>
                  <p>{project_name || '@Project 未割り当て'}</p>
                </Link>}

            {!project_id
             && <p>{project_name || '@Project 未割り当て'}</p>}

            {project_number
             && (<p style={{marginLeft:11}}>
                   <ANewTab to={project.url()}>
                     ({project_number})
                   </ANewTab>
                 </p>)}
          </div>

          <div>
            {!props.close &&
             <FontAwesomeIcon icon={faWindowMinimize} onClick={clickClose} />}

            {props.close &&
             <FontAwesomeIcon icon={faWindowMaximize} onClick={clickOpen} />}
          </div>
        </div>
    );
}
