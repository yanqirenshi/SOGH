import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import ANewTab from '../common/ANewTab.js';
import ButtonToggle from '../common/ButtonToggle.js';

import ButtonViewSwitch from './ButtonViewSwitch.js';
import ButtonRefresh from './ButtonRefresh.js';
import Cards from './Cards.js';
import Table from './Table.js';
import Search from './Search.js';

import style from '../scrum_projects/Style.js';

export default function Contents (props) {
    const [updated_at, setUpdatedAt] = useState(null);

    const sogh = props.sogh;
    const core = props.core;

    const callbacks = {

        filter: {
            keyword: {
                change: (v) => {
                    core.changeFilterKeyword(v);
                    setUpdatedAt(new Date());
                },
            },
            priority: {
                switch: (code) => {
                    core.switchFilterPriority(code);
                    setUpdatedAt(new Date());
                }
            },
            closing: (code) => {
                core.switchFilterClosing (code);
                setUpdatedAt(new Date());
            },
        },
        view: {
            change: (type) => {
                core.changeViewMode(type);
                setUpdatedAt(new Date());
            },
        },
        refresh: () => props.callbacks.refresh(),
    };

    const filterd_projects = core.filtering(props.projects);

    return (
        <div style={style.root}>
          <span style={{display:'none'}}>{!!updated_at}</span>

          <div style={{display:'flex', justifyContent: 'center', paddingTop: 11, paddingBottom: 0 }}>
            <div style={{marginRight:33}}>
              <ButtonRefresh callbacks={callbacks} />
            </div>

            <div style={{marginRight:22}}>
              <ButtonViewSwitch type={core._view_mode}
                                callbacks={callbacks} />
            </div>

            <Search filter={core._filter}
                    projects={props.projects || []}
                    sogh={sogh}
                    callbacks={callbacks.filter} />

            {filterd_projects.length>0 &&
             <div style={{marginRight:22}}>
               <ButtonToggle label="Closing"
                             on={!core._filter.closing}
                             code={'closing'}
                             callback={callbacks.filter.closing}/>
             </div>}

            {props.help &&
             <div style={{marginLeft:22, fontSize: 22, display: 'flex', alignItems:'center'}}>
               <ANewTab to={props.help.to}>
                 <FontAwesomeIcon style={{}} icon={faQuestionCircle} />
               </ANewTab>
             </div>}
          </div>

          <div style={{flexGrow: 1, overflow: 'auto', padding: 22}}>
            {'table'===core._view_mode &&
             <Table projects={filterd_projects}
                    sogh={sogh}
                    productbacklog_url_prefix={props.productbacklog_url_prefix} />}

            {'cards'===core._view_mode &&
             <Cards projects={filterd_projects} sogh={sogh} />}
          </div>
        </div>
    );
}
