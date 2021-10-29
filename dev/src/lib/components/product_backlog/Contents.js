import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import Hero from './Hero.js';
import PanelProductBacklog from './PanelProductBacklog.js';

export default function Contents (props) {
    const [tabs] = useState([
        { code: 'columns',    label: 'Columns' },
        { code: 'milestones', label: 'Milestones' },
        { code: 'overview',   label: 'Overview' },
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
                click: (type, id) => core.changeFilter('milestones', type, id, ()=>updated()),
                keyword: {
                    change: (val) => core.changeFilter('milestones', 'keyword', val, ()=>updated()),
                } ,
            },
        },
        columns: {
            refresh: () => refresh(),
            filter: {
                click: (type, id) => core.changeFilter('columns', type, id, ()=>updated()),
                keyword: {
                    change: (val) => core.changeFilter('columns', 'keyword', val, ()=>updated()),
                } ,
            },
        },
    };

    return (
        <div>
          <span style={{display:'none'}}>{!!updated_at}</span>

          <Hero sogh={core._sogh}
                project={project}
                tabs={tabs}
                selected_tab={selected_tab}
                root_url={props.root_url} />

          <PanelProductBacklog core={core}
                               project={project}
                               selected_tab={selected_tab}
                               callbacks={callbacks} />
        </div>
    );
}
