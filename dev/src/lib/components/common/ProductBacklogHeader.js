import React from 'react';

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

    return (
        <div className="panel-heading" style={style_header}>
          <div style={{flexGrow:1}}>
            <ANewTab to={project.url}>
              <FontAwesomeIcon style={{}} icon={faExternalLinkAlt} />
            </ANewTab>
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
