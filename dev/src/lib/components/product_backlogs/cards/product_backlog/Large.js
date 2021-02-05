import React from 'react';
import Header from './Header.js';
import NameWithNum from './NameWithNum.js';
import BarProgress from './BarProgress.js';

const s = {
    body: {width:'100%', whiteSpace: 'break-spaces'},
};

export default function Large (props) {
    const sogh = props.sogh;
    const project = props.project;

    return (
        <>
          <Header size="large" project={project} sogh={sogh} callbacks={props.callbacks} />

          <div className="panel-block">
            <NameWithNum project={project} style={{fontWeight:'bold'}} />
          </div>

          <div className="panel-block">
            <pre style={s.body}>
              {project.body}
            </pre>
          </div>

          <div className="panel-block">
            <BarProgress project={project}/>
          </div>
        </>
    );
}
