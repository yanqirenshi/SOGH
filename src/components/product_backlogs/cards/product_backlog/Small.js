import React from 'react';
import Header from './Header.js';
import ButtonSizeing from './ButtonSizeing.js';
import NameWithNum from './NameWithNum.js';

const s = {
    contents: {flexDirection:'column', padding: 6},
    controller: {display:'flex', alignItems: 'center', marginTop:11},
}

export default function Small (props) {
    const sogh = props.sogh;
    const project = props.project;
    const callbacks = props.callbacks;

    return (
        <>
          <Header size="small" project={project} sogh={sogh} callbacks={props.callbacks} />

          <div className="panel-block" style={s.contents}>
            <NameWithNum project={project} style={{fontSize:12}}/>

            <div style={s.controller}>
              <ButtonSizeing label="大"
                             priority={project.priority}
                             onClick={callbacks.toLarge}
                             sogh={sogh}
                             style={{marginRight:8}}/>

              <ButtonSizeing label="中"
                             priority={project.priority}
                             sogh={sogh}
                             onClick={callbacks.toMedium} />
            </div>
          </div>
        </>
    );
}
