import React from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import * as SOGH from './lib/index.js';

import Tabs from './Tabs.js';

function isActive (a,b) {
    if (a.code===b)
        return null;

    return {display:'none'};
};

function App() {
    const tabs = [
        { code: 'ds', label: 'Daily scrum' },
        { code: 'sp', label: 'Sprint planning' },
        { code: 'pb', label: 'Product backlog' },
        { code: 'rp', label: 'Reports' },
    ];

    const pathname = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const selected = params.get('tab') || tabs[0].code;

    const token = process.env.REACT_APP_GITHUB_PARSONAL_TOKEN;
    const repository = {
        owner: process.env.REACT_APP_GITHUB_REPOSITORY_OWNER,
        name:  process.env.REACT_APP_GITHUB_REPOSITORY_NAME,
    };

    return (
        <div>
          <div style={{paddingTop:11}}>
            <Tabs tabs={tabs} selected={selected} pathname={pathname} />
          </div>

          <div style={isActive(tabs[0], selected)}>
            <SOGH.DailyScrum token={token} repository={repository} />
          </div>

          <div style={isActive(tabs[1], selected)}>
            <SOGH.SprintPlanning token={token} repository={repository} />
          </div>

          <div style={isActive(tabs[2], selected)}>
            <SOGH.ProductBacklogs token={token} repository={repository} />
          </div>

          <div style={isActive(tabs[3], selected)}>
            <SOGH.Reports token={token} repository={repository} />
          </div>
        </div>
    );
}

export default App;
