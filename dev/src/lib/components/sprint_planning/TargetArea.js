import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import Milestone from './Milestone.js';

export default function TargetArea (props) {
    const sogh = props.sogh;
    const milestone = props.milestone;
    const projects = props.projects;

    return (

        <div style={{marginBottom: 22, display: 'flex'}}>
          <div style={{flexGrow:1}}>
            <Milestone milestone={milestone}
                       projects={projects.list}
                       sogh={sogh} />
          </div>

          {props.help &&
           <div style={{marginLeft:22, fontSize: 33}}>
             <a href={props.help.to} target="_blank" rel="noopener noreferrer">
               <FontAwesomeIcon style={{}} icon={faQuestionCircle} />
             </a>
           </div>}
        </div>
    );
}
