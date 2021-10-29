import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import ControllerIssues from '../common/ControllerIssues.js';

import Hero from './Hero.js';
import Overivew from './Overivew.js';
import Milestones from './Milestones.js';
import Columns from './Columns.js';

const style = {
    controller: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 11,
        paddingLeft: 88,
        paddingRight: 88,
    },
    milestones: {
        paddingTop:0,
    },
};

export default function PanelProductBacklog (props) {
    const core = props.core;
    const project = props.project;
    const selected_tab = props.selected_tab;
    const callbacks = props.callbacks;

    if (!project) return null;

    const data = core._data;
    const filters = core._filters;

    if (selected_tab.code==='overview')
        return (
            <div>
              <Overivew core={core}
                        project={project}
                        data={data}/>
            </div>
        );

    if (selected_tab.code==='milestones')
        return (
            <div>
              <div style={style.controller}>
                <ControllerIssues issues={data.issues}
                                  filter={filters.milestones}
                                  callbacks={callbacks.milestones}
                                  sogh={core._sogh}/>
              </div>

              <Milestones style={style.milestones}
                          project={project}
                          milestones={data.milestones.list}
                          filter={filters.milestones} />
            </div>
        );

    if (selected_tab.code==='columns')
        return (
            <div>
              <div style={style.controller}>
                <ControllerIssues issues={data.issues}
                                  filter={filters.columns}
                                  callbacks={callbacks.columns}
                                  sogh={core._sogh}/>
              </div>

              <Columns style={style.milestones}
                       core={core}
                       columns={data.columns.list}
                       project={project}
                       filter={filters.columns} />
            </div>
        );

    return null;
}
