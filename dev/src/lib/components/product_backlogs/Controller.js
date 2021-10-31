import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import ANewTab from '../common/ANewTab.js';

import ButtonViewSwitch from './ButtonViewSwitch.js';
import ButtonRefresh from './ButtonRefresh.js';

import PBFilters from './PBFilters.js';

const style = {
    paddingTop: 11,
    contents: {
        marginTop: 11,
        display: 'flex',
        justifyContent: 'center',
    }
};

export default function Controller (props) {
    const sogh = props.sogh;
    const core = props.core;
    const filterd_projects = props.filterd_projects;
    const callbacks = props.callbacks;
    const projects = props.projects;
    const help = props.help;

    return (
        <div style={style}>
          <div>
            <PBFilters sogh={sogh}
                       core={core}
                       callbacks={callbacks}
                       projects={projects}
                       filterd_projects={filterd_projects}
                       help={help}/>
          </div>

          <div style={style.contents}>
            <div>
              <ButtonRefresh callbacks={callbacks} />
            </div>

            <div>
              <ButtonViewSwitch type={core._view_mode} />
            </div>

            {help &&
             <div style={style.help}>
               <ANewTab to={help.to}>
                 <FontAwesomeIcon style={{}} icon={faQuestionCircle} />
               </ANewTab>
             </div>}
          </div>
        </div>
    );
}
