import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import Hero from '../components/Hero.js';


import * as Tab from './home/Tabs.js';

import * as WBS_DATA from '../data/WBS_DATA.js';

const wbs_data = {
    projects:     WBS_DATA.PROJECTS,
    wbs:          WBS_DATA.WBS,
    workpackages: WBS_DATA.WORKPACKAGES,
    edges:        WBS_DATA.EDGES,
};

function Home (props) {
    const [tabs] = useState([
        { code: 'overview',   label: 'Overview' },
        { code: 'backlogs',   label: 'Backlogs' },
        { code: 'sogh',       label: 'Sogh' },
        // { code: 'issue',      label: 'Issue' },
        // { code: 'milestone',  label: 'Milestone' },
        // { code: 'project',    label: 'Project' },
        // { code: 'repository', label: 'Repository' },
        { code: 'classes',    label: 'Classes' },
        { code: 'wbs',        label: 'Wbs' },
    ]);

    const search = new URLSearchParams(useLocation().search);
    const active_code = search.get('tab') || tabs[0].code || null;

    const contetns = (code) => {
        switch (code) {
        case 'overview':   return <Tab.Overview wbs={wbs_data} />;
        case 'backlogs':   return <Tab.Backlogs wbs={wbs_data} sogh={props.sogh} repo={props.repo}/>;
        case 'sogh':       return <Tab.Sogh />;
        // case 'issue':      return <Tab.Issue />;
        // case 'milestone':  return <Tab.Milestone />;
        // case 'project':    return <Tab.Project />;
        // case 'repository': return <Tab.Repository />;
        case 'classes':    return <Tab.Classes wbs={wbs_data} />;
        case 'wbs':        return <Tab.Wbs wbs={wbs_data} />;
        default: return  null;
        }
    };

    return (
        <>
          <Hero tabs={tabs}
                title="SOGH"
                subtitle="Scrum on Github" />

          {contetns(active_code)}
        </>
    );
}

export default Home;
