import React from 'react';

import ControllerIssues from '../common/ControllerIssues.js';

import GanttChart from './panel_product_backlog/GanttChart.js';
import Overivew from './panel_product_backlog/Overivew.js';
import Milestones from './panel_product_backlog/Milestones.js';
import Columns from './panel_product_backlog/Columns.js';

const style = {
    paddingLeft: 88,
    paddingRight: 88,
    controller: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 11,
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

    if (selected_tab.code==='gantt')
        return (
            <div style={style}>
              <GanttChart core={core}
                          project={project}
                          data={data}/>
            </div>
        );

    if (selected_tab.code==='overview')
        return (
            <div style={style}>
              <Overivew core={core}
                        project={project}
                        data={data}/>
            </div>
        );

    if (selected_tab.code==='milestones')
        return (
            <div style={style}>
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
            <div style={style}>
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
