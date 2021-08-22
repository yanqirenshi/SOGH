import React from 'react';

import Labels from './Labels.js';
import NextActionDate from './NextActionDate.js';
import LargeIssueTitle from './LargeIssueTitle.js';
import LargeProject from './LargeProject.js';
import LargeDueDate from './LargeDueDate.js';
import LargeMilestone from './LargeMilestone.js';
import LargePlans from './LargePlans.js';
import LargeResults from './LargeResults.js';

export default function PanelIssueLarge (props) {
    const issue = props.issue;

    const milestone = issue.milestone;

    const active = props.sogh.active();

    const dummy = (v) => { console.log(v); };

    return (
        <div>
          <LargeIssueTitle issue={issue} />

          <div>
            <Labels issue={issue} labels={active.labels} />
          </div>

          <div>
            <LargeProject issue={issue} projects={active.projects} />
          </div>

          <div style={{marginTop:11}}>
            {milestone && <LargeMilestone issue={issue}
                                          milestones={active.milestones} />}
          </div>

          <div style={{display:'flex', marginTop:11, paddingLeft:11, paddingRight:11}}>
            <div>
              <LargeDueDate issue={issue} callback={dummy} />
            </div>

            <div style={{marginLeft:22}}>
              <NextActionDate issue={issue} callback={dummy} />
            </div>
          </div>

          <div style={{display:'flex', marginTop:11, paddingLeft:11, paddingRight:11}}>
            <LargePlans issue={issue} />

            <div style={{marginLeft:22, flexGrow:1}}>
              <LargeResults issue={issue} />
            </div>
          </div>

        </div>
    );
}
