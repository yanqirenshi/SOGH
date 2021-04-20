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

export default function Contents (props) {
    const [tabs] = useState([
        { code: 'overview',   label: 'Overview' },
        { code: 'milestones', label: 'Milestones' },
        { code: 'columns',    label: 'Columns' },
    ]);
    const [core] = useState(props.core);
    const [project, setProject] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);

    const updated = ()=>setUpdatedAt(new Date());
    const refresh = ()=>core.fetch(project, ()=>updated());

    useEffect(() => core.getProjectByID(props.project_id, setProject), [core]);
    useEffect(() => refresh(), [project]);

    const selected_tab = core.selectedTab(useLocation(), tabs);

    const callbacks = {
        milestones: {
            refresh: () => refresh(),
            filter: {
                click: (type, id) => core.changeFilter('milestones', type, id, ()=>updated())
            },
        },
        columns: {
            refresh: () => refresh(),
            filter: {
                click: (type, id) => core.changeFilter('columns', type, id, ()=>updated())
            },
        },
    };

    if (!project) return null;

    const data = core._data;
    const filters = core._filters;
    return (
        <div>
          <span style={{display:'none'}}>{!!updated_at}</span>

          <Hero sogh={core._sogh}
                project={project}
                tabs={tabs}
                selected_tab={selected_tab}
                root_url={props.root_url} />

          {selected_tab.code==='overview' &&
           <div>
             <Overivew core={core} data={data}/>
           </div>}

          {selected_tab.code==='milestones' &&
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
           </div>}

          {selected_tab.code==='columns' &&
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
           </div>}
        </div>
    );
}
