import React, { useState } from 'react';

import Cards from './Cards.js';
import Table from './Table.js';
import Controller from './Controller.js';

const style = {
    root: {
        display:'flex',
        flexDirection: 'column',
        width:'100%',
        height:'100%',
    },
    controller: {
        paddingLeft: 88,
        paddingRight: 88,
    },
};

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
