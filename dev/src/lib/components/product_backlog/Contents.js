import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import ControllerIssues from '../common/ControllerIssues.js';

import Hero from './Hero.js';
import Milestones from './Milestones.js';
import Columns from './Columns.js';

const style = {
    controller: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 11
    },
    milestones: {
        paddingTop:0,
    },
};

export default function Contents (props) {
    const [tabs] = useState([
        { code: 'milestones', label: 'Milestones', selected: true },
        { code: 'columns',    label: 'Columns',    selected: false },
    ]);
    const [project, setProject] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);

    const core = props.core;

    useEffect(() => core.getProjectByID(props.project_id, setProject), []);
    useEffect(() => core.fetch(project, ()=>setUpdatedAt(new Date())), [project]);

    const selected_tab = core.selectedTab(useLocation(), tabs);

    const data = core._data;
    const filters = core._filters;
    return (
        <>
          {project &&
           <div>
             <Hero sogh={core._sogh}
                   project={project}
                   tabs={tabs}
                   selected_tab={selected_tab}
                   root_url={props.root_url}/>


             {selected_tab.code==='milestones'
              &&
              <div>
                <div style={style.controller}>
                  <ControllerIssues issues={data.issues}
                                    filter={filters.columns}
                                    callbacks={{}}
                                    sogh={core._sogh}/>
                </div>

                <Milestones style={style.milestones}
                            milestones={data.milestones.list}
                            project={project} />
              </div>}

             {selected_tab.code==='columns'
              && <Columns columns={data.columns.list}
                          project={project} />}
           </div>}
        </>
    );
}
