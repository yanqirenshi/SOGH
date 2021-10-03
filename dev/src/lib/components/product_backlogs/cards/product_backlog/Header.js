import React from 'react';

import ButtonSizeing from './ButtonSizeing.js';

const s = {
    root: {
        fontSize:14,
        display: 'flex',
        padding: '0px 11px'
    },
    title: {flexGrow:1, padding: '11px 0px', display: 'flex'},
    controller: {display:'flex', alignItems: 'center'},
};

export default function Header (props) {
    const sogh = props.sogh;
    const project = props.project;
    const callbacks = props.callbacks;

    const color = project.colorByPriority();
    const s_root = {...s.root, ...color};

    return (
        <div className="panel-heading"
             style={s_root}>

          <div style={s.title}>
            {project.type || '????????'}
          </div>

          <div style={s.controller}>
            {props.size==='medium' &&
             <ButtonSizeing label="大"
                            priority={project.priority}
                            sogh={sogh}
                            onClick={callbacks.toLarge}
                            style={{marginRight:8}} />}

            {props.size==='large' &&
             <ButtonSizeing label="中"
                            priority={project.priority}
                            sogh={sogh}
                            onClick={callbacks.toMedium}
                            style={{marginRight:8}} />}

            {(props.size==='large' || props.size==='medium') &&
             <ButtonSizeing label="小"
                            priority={project.priority}
                            sogh={sogh}
                            onClick={callbacks.toSmall}
                            style={{marginRight:8}} />}
          </div>
        </div>
    );
}
