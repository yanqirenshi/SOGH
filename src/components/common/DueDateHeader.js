import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWindowMinimize, faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

export default function DueDateHeader (props) {
    const clickClose = () => props.callbacks.duedate.close(props.date);
    const clickOpen  = () => props.callbacks.duedate.open(props.date);

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
