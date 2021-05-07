import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExternalLinkAlt, faWindowMinimize, faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";
import ANewTab from './ANewTab.js';

export default function ProductBacklogHeader (props) {
    const sogh = props.sogh;

    const project = props.project;

    const clickClose = () => props.callbacks.projects.close(project.id);
    const clickOpen = () => props.callbacks.projects.open(project.id);

    const style_header = {...sogh.headerColor(project), ...{fontSize:14, display: 'flex'}};
    const pb_to = props.productbacklog_url_prefix + project.id;

    return (
        <div className="panel-heading" style={style_header}>
          <div style={{flexGrow:1, display:'flex'}}>
            {project.id
             && <Link to={pb_to} style={{color: 'inherit'}}>
                  <p>{project.name || '@Project 未割り当て'}</p>
                </Link>}

            {!project.id
             && <p>{project.name || '@Project 未割り当て'}</p>}

            {project.number
             && (<p style={{marginLeft:11}}>
                   <ANewTab to={project.url}>
                     ({project.number})
                   </ANewTab>
                 </p>)}
          </div>

          <div>
            {!props.close &&
             <FontAwesomeIcon style={{}}
                              icon={faWindowMinimize}
                              onClick={clickClose} />}
            {props.close &&
             <FontAwesomeIcon style={{}}
                              icon={faWindowMaximize}
                              onClick={clickOpen} />}
          </div>
        </div>
    );
}
