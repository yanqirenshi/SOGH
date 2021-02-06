import React from 'react';

import Header from './Header.js';
import NameWithNum from './NameWithNum.js';
import BarProgress from './BarProgress.js';

export default function Medium (props) {
    const sogh = props.sogh;
    const project = props.project;

    return (
        <>
          <Header size="medium" project={project} sogh={sogh} callbacks={props.callbacks} />

          <div className="panel-block">
            <NameWithNum project={project} style={{fontWeight:'bold'}} />
          </div>

          <div className="panel-block">
            {project.progress.enabled &&
             <BarProgress project={project} />}
            {!project.progress.enabled &&
             <p style={{fontSize:12}}>
               Disable track progress or Empty
             </p>}
          </div>
        </>
    );
}
