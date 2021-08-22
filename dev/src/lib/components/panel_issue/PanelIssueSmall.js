import React from 'react';

import IssueTitle from './IssueTitle.js';
import Labels from './Labels.js';
import DueDate from './DueDate.js';
import ProjectName from './ProjectName.js';
import Milestone from './Milestone.js';

function getProjectColumn (issue) {
    const project_card = issue.projectCards.nodes[0];

    if (!project_card)
        return null;

    return project_card.column;
}

export default function PanelIssueSmall (props) {
    const issue = props.issue;

    const milestone = issue.milestone;

    const column = getProjectColumn(issue);

    return (
        <div style={{wordBreak: 'break-all', padding: 11}}>
          <IssueTitle issue={issue} />
          <Labels issue={issue} />
          <DueDate issue={issue} />
          <ProjectName issue={issue} />

          {!column &&
           <div style={{fontSize:12, marginTop:8, color: '#f00'}}>
             <p>Project なし</p>
           </div>}

          {milestone && <Milestone issue={issue}/>}
        </div>
    );
}
