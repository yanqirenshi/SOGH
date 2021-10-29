import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";

import 'react-bulma-components/dist/react-bulma-components.min.css';

import * as SOGH from './lib/index.js';

import Tabs from './components/Tabs.js';
import TabCreateIssue from './components/TabCreateIssue.js';
// import IssueDescription from './components/IssueDescription.js';
import TabPanelIssue from './components/TabPanelIssue.js';
import TabCalendar from './components/TabCalendar.js';

function isActive (a,b) {
    if (a.code===b)
        return null;

    return {display:'none'};
};

function selectedTab (location, tabs) {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || tabs[0].code;
}

const tabs = [
    { code: 'cl',  label: 'Calendar' },
    { code: 'pi',  label: 'Panel Issue' },
    { code: 'ci',  label: 'Create Issue' },
    { code: 'sct', label: 'Scrum (Timeline)' },
    { code: 'ds',  label: 'Scrum (Projects)' },
    { code: 'sp',  label: 'Sprint planning' },
    { code: 'pb',  label: 'Product backlog' },
    { code: 'rp',  label: 'Reports' },
];

function PageHome (props) {
    const sogh = props.sogh;
    const repository = props.repository;

    const location = useLocation();
    const selected = selectedTab(location, tabs);

    useEffect(() => {
        if (!repository) return;
        sogh.getIssuesOpenByLabel(repository, '会議', (x)=> x);
    }, [repository]);

    if (!repository) return null;

    const pb_url_prefix = '/product-backlogs/';

    return (
        <div>

          <div style={{paddingTop:11}}>
            <Tabs tabs={tabs} selected={selected} pathname={location.pathname} />
          </div>


          <div style={isActive(tabs[0], selected)}>
            {sogh && <TabCalendar repository={repository} sogh={sogh} />}
          </div>

          <div style={isActive(tabs[1], selected)}>
            {sogh && <TabPanelIssue repository={repository} sogh={sogh} />}
          </div>

          <div style={isActive(tabs[2], selected)}>
            {sogh && <TabCreateIssue sogh={sogh} />}
          </div>

          <div style={isActive(tabs[3], selected)}>
            <SOGH.ScrumTimeline sogh={sogh}
                                repository={repository}
                                productbacklog_url_prefix={pb_url_prefix} />
          </div>

          <div style={isActive(tabs[4], selected)}>
            <SOGH.ScrumProjects sogh={sogh}
                                repository={repository}
                                productbacklog_url_prefix={pb_url_prefix} />
          </div>

          <div style={isActive(tabs[5], selected)}>
            <SOGH.SprintPlanning sogh={sogh}
                                 repository={repository}
                                 productbacklog_url_prefix={pb_url_prefix} />
          </div>

          <div style={isActive(tabs[6], selected)}>
            <SOGH.ProductBacklogs sogh={sogh}
                                  repository={repository}
                                  productbacklog_url_prefix={pb_url_prefix} />
          </div>

          <div style={isActive(tabs[7], selected)}>
            <SOGH.Reports sogh={sogh}
                          repository={repository} />
          </div>
        </div>
    );
}

export default connect(
    (state) => {
        return {};
    },
    (dispatch) => ({}),
)(PageHome);
