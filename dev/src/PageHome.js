import React from 'react';
import { connect } from 'react-redux';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import * as SOGH from './lib/index.js';

import Tabs from './components/Tabs.js';

function isActive (a,b) {
    if (a.code===b)
        return null;

    return {display:'none'};
};

function PageHome (props) {
    const tabs = [
        { code: 'vis', label: 'Issues' },
        { code: 'sct', label: 'Scrum (Timeline)' },
        { code: 'ds',  label: 'Scrum (Projects)' },
        { code: 'sp',  label: 'Sprint planning' },
        { code: 'pb',  label: 'Product backlog' },
        { code: 'rp',  label: 'Reports' },
    ];
    const pathname = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const selected = params.get('tab') || tabs[0].code;

    const repository = {
        owner: process.env.REACT_APP_GITHUB_REPOSITORY_OWNER,
        name:  process.env.REACT_APP_GITHUB_REPOSITORY_NAME,
    };

    const sogh = props.sogh;
    return (
        <div>
          <div style={{paddingTop:11}}>
            <Tabs tabs={tabs} selected={selected} pathname={pathname} />
          </div>

          <div style={isActive(tabs[0], selected)}>
            <SOGH.ViwerIssues sogh={sogh} repository={repository} />
          </div>

          <div style={isActive(tabs[1], selected)}>
            <SOGH.ScrumTimeline sogh={sogh}
                                repository={repository} />
          </div>

          <div style={isActive(tabs[2], selected)}>
            <SOGH.ScrumProjects sogh={sogh}
                                repository={repository} />
          </div>

          <div style={isActive(tabs[3], selected)}>
            <SOGH.SprintPlanning sogh={sogh}
                                 repository={repository} />
          </div>

          <div style={isActive(tabs[4], selected)}>
            <SOGH.ProductBacklogs sogh={sogh}
                                  repository={repository}
                                  productbacklog_url_prefix="/product-backlogs/" />
          </div>

          <div style={isActive(tabs[3], selected)}>
            <SOGH.Reports sogh={sogh}
                          repository={repository} />
          </div>
        </div>
    );
}

export default connect(
    (state) => {
        return {
            sogh: state.sogh,
        };
    },
    (dispatch) => ({}),
)(PageHome);
