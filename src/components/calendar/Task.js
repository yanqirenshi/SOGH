import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";


import './Cell.css';

export default function Task (props) {
    const task = props.task;

    const style = {
        fontSize:14,
        marginRight: 8,
        marginBottom: 6,
        background: '#e0ebaf',
        padding: '1px 8px',
        borderRadius: 3,
        display: 'flex',
    };

    const click = (e)=> {
        e.stopPropagation();
    };

    return (
        <div style={style} onClick={click}>
          <p style={{wordBreak: 'break-all'}}>
            {task.name}

            {task.url
             && (
                 <a style={{marginLeft:10}}
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer">
                   <FontAwesomeIcon style={{fontSize:11, color:'#888'}}
                                    icon={faExternalLinkAlt} />
                 </a>
             )}
          </p>
        </div>
    );
}
