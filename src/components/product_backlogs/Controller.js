import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import ANewTab from '../common/ANewTab.js';
import ButtonToggle from '../common/ButtonToggle.js';

import ButtonViewSwitch from './ButtonViewSwitch.js';
import ButtonRefresh from './ButtonRefresh.js';
import Search from './Search.js';

const style = {
    display:'flex',
    justifyContent: 'center',
    paddingTop: 11,
    paddingBottom: 0 ,
    item1: { marginRight:11 },
    help: {
        marginLeft:22,
        fontSize: 22,
        display: 'flex',
        alignItems:'center',
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
          <div style={style.item1}>
            <ButtonRefresh callbacks={callbacks} />
          </div>

          <div style={style.item1}>
            <ButtonViewSwitch type={core._view_mode} callbacks={callbacks} />
          </div>

          <Search filter={core._filter}
                  projects={projects || []}
                  core={core}
                  sogh={sogh}
                  callbacks={callbacks.filter} />

          {filterd_projects.length>0 &&
           <div style={style.item1}>
             <ButtonToggle label="Closing"
                           on={!core._filter.closing}
                           code={'closing'}
                           callback={callbacks.filter.closing}/>
           </div>}

          {help &&
           <div style={style.help}>
             <ANewTab to={help.to}>
               <FontAwesomeIcon style={{}} icon={faQuestionCircle} />
             </ANewTab>
           </div>}
        </div>
    );
}
