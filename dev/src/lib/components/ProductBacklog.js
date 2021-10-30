import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import NotSignIn from './common/NotSignIn.js';

import Hero from './common/HeroProductBacklog.js';
import PanelProductBacklog from './common/PanelProductBacklog.js';

const tabs = [
    { code: 'columns',    label: 'Columns' },
    { code: 'milestones', label: 'Milestones' },
    { code: 'overview',   label: 'Overview' },
];

export default function ProductBacklog (props) {
    const [core, setCore] = useState(null);
    const [project, setProject] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);

    const sogh       = props.sogh;
    const project_id = props.project_id;
    const root_url   = props.root_url;
    const location   = useLocation();

    const updated = ()=> setUpdatedAt(new Date());
    const refresh = ()=> core && core.fetch(project, ()=>updated());
    const getProject = (id)=> core.getProjectByID(id, (prj)=>setProject(prj));

    useEffect(()=> sogh && setCore(sogh.productBacklog()), [sogh]);
    useEffect(()=> core && getProject(project_id), [core, project_id]);
    useEffect(()=> refresh(), [project]);

    if (!core) return <NotSignIn />;

    const selected_tab = core.selectedTab(location, tabs);

    const callbacks = {
        milestones: {
            refresh: ()=> refresh(),
            filter: {
                click: (type, id)=> core.changeFilter('milestones', type, id, ()=>updated()),
                keyword: {
                    change: (val)=> core.changeFilter('milestones', 'keyword', val, ()=>updated()),
                } ,
            },
        },
        columns: {
            refresh: ()=> refresh(),
            filter: {
                click: (type, id)=> core.changeFilter('columns', type, id, ()=>updated()),
                keyword: {
                    change: (val)=> core.changeFilter('columns', 'keyword', val, ()=>updated()),
                } ,
            },
        },
    };

    return (
        <div>
          <span style={{display:'none'}}>{!!updated_at}</span>

          <Hero sogh={sogh}
                project={project}
                tabs={tabs}
                selected_tab={selected_tab}
                root_url={root_url} />

          <PanelProductBacklog core={core}
                               project={project}
                               selected_tab={selected_tab}
                               callbacks={callbacks} />
        </div>
    );
}
