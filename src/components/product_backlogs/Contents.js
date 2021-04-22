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
import Controller from './Controller.js';

import style from '../scrum_projects/Style.js';

export default function Contents (props) {
    const [updated_at, setUpdatedAt] = useState(null);

    const sogh = props.sogh;
    const core = props.core;
    const projects = props.projects;
    const filterd_projects = core.filtering(props.projects);

    const callbacks = {
        filter: {
            keyword: {
                change: (v) => {
                    core.changeFilterKeyword(v);
                    setUpdatedAt(new Date());
                },
            },
            priority: {
                switch: (item) => {
                    core.switchFilterPriority(item);
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

    return (
        <div style={style.root}>
          <span style={{display:'none'}}>{!!updated_at}</span>

          <div style={style.controller}>
            <Controller sogh={sogh}
                        core={core}
                        callbacks={callbacks}
                        projects={projects}
                        filterd_projects={filterd_projects}
                        help={props.help} />
          </div>

          <div style={{flexGrow: 1, overflow: 'auto', padding: 22, paddingTop:11}}>
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
