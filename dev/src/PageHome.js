import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import * as SOGH from './lib/index.js';

import Tabs from './components/Tabs.js';
import TabCreateIssue from './components/TabCreateIssue.js';
import IssueDescription from './components/IssueDescription.js';
import TabPanelIssue from './components/TabPanelIssue.js';

function isActive (a,b) {
    if (a.code===b)
        return null;

    return {display:'none'};
};

function PageHome (props) {
    const [tabs] = useState([
        { code: 'pi',  label: 'Panel Issue' },
        { code: 'ci',  label: 'Create Issue' },
        { code: 'vis', label: 'Issues' },
        { code: 'sct', label: 'Scrum (Timeline)' },
        { code: 'ds',  label: 'Scrum (Projects)' },
        { code: 'sp',  label: 'Sprint planning' },
        { code: 'pb',  label: 'Product backlog' },
        { code: 'rp',  label: 'Reports' },
        { code: 'id',  label: 'Issue Description' },
    ]);

    const sogh = props.sogh;

    const pathname = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const selected = params.get('tab') || tabs[0].code;

    const repository = {
        owner: process.env.REACT_APP_GITHUB_REPOSITORY_OWNER,
        name:  process.env.REACT_APP_GITHUB_REPOSITORY_NAME,
    };

    const listener = () => console.log('finish get issues by gtd');

    useEffect(() => {
        if (!sogh) return;
        // sogh.getIssuesOpenByLabel(repository, '会議', (x)=> x);
    }, [sogh]);

    return (
        <div>
          <div style={{paddingTop:11}}>
            <Tabs tabs={tabs} selected={selected} pathname={pathname} />
          </div>

          {/* <div style={isActive(tabs[0], selected)}> */}
          {/*   {sogh && <TabPanelIssue repository={repository} sogh={sogh} />} */}
          {/* </div> */}

          {/* <div style={isActive(tabs[1], selected)}> */}
          {/*   {sogh && <TabCreateIssue sogh={sogh} />} */}
          {/* </div> */}

          {/* <div style={isActive(tabs[2], selected)}> */}
          {/*   <SOGH.ViwerIssues sogh={sogh} */}
          {/*                     repository={repository} */}
          {/*                     listener={listener}/> */}
          {/* </div> */}

          {/* <div style={isActive(tabs[3], selected)}> */}
          {/*   <SOGH.ScrumTimeline sogh={sogh} */}
          {/*                       repository={repository} /> */}
          {/* </div> */}

          {/* <div style={isActive(tabs[4], selected)}> */}
          {/*   <SOGH.ScrumProjects sogh={sogh} */}
          {/*                       repository={repository} /> */}
          {/* </div> */}

          {/* <div style={isActive(tabs[5], selected)}> */}
          {/*   <SOGH.SprintPlanning sogh={sogh} */}
          {/*                        repository={repository} /> */}
          {/* </div> */}

          {/* <div style={isActive(tabs[6], selected)}> */}
          {/*   <SOGH.ProductBacklogs sogh={sogh} */}
          {/*                         repository={repository} */}
          {/*                         productbacklog_url_prefix="/product-backlogs/" /> */}
          {/* </div> */}

          {/* <div style={isActive(tabs[7], selected)}> */}
          {/*   <SOGH.Reports sogh={sogh} */}
          {/*                 repository={repository} /> */}
          {/* </div> */}

          {/* <div style={isActive(tabs[8], selected)}> */}
          {/*   {sogh && <IssueDescription sogh={sogh} */}
          {/*                              repository={repository} */}
          {/*                              listener={listener} />} */}
          {/* </div> */}
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
