import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExternalLinkAlt, faWindowMinimize, faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductBacklogHeader (props) {
    const sogh = props.sogh;

    const project = props.project;

    const clickClose = () => props.callbacks.clickCloseProductBacklog(project.id);
    const clickOpen = () => props.callbacks.clickOpenProductBacklog(project.id);

    const style_header = {...sogh.headerColor(project), ...{fontSize:14, display: 'flex'}};

    return (
        <div className="panel-heading" style={style_header}>
          <div style={{flexGrow:1}}>
            <a href={project.url}>
              <FontAwesomeIcon style={{}} icon={faExternalLinkAlt} />
            </a>
            {project.name || '@Project 未割り当て'}
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
