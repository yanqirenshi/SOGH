import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExternalLinkAlt, faWindowMinimize, faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";
import ANewTab from './ANewTab.js';

export default function DueDateHeader (props) {
    const sogh = props.sogh;

    const project = props.project;

    const clickClose = () => props.callbacks.clickCloseProductBacklog(project.id);
    const clickOpen = () => props.callbacks.clickOpenProductBacklog(project.id);

    const style_header = {
        ...{fontSize:14, display: 'flex'}
    };

    return (
        <div className="panel-heading" style={style_header}>
          <div style={{flexGrow:1}}>
            {props.date}
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
