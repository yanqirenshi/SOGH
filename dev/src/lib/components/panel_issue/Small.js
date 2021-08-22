import React from 'react';

import Labels           from './Labels.js';
import SmallIssueTitle  from './SmallIssueTitle.js';
import SmallDueDate     from './SmallDueDate.js';
import SmallProjectName from './SmallProjectName.js';
import SmallMilestone   from './SmallMilestone.js';

function getProjectColumn (issue) {
    const project_card = issue.projectCards.nodes[0];

    if (!project_card)
        return null;

    return project_card.column;
}

export default function Small (props) {
    const issue = props.issue;

    const milestone = issue.milestone;

    const column = getProjectColumn(issue);

    return (
        <div style={{wordBreak: 'break-all', padding: 11}}>
          <SmallIssueTitle issue={issue} />
          <Labels issue={issue} />
          <SmallDueDate issue={issue} />
          <SmallProjectName issue={issue} />

          {!column &&
           <div style={{fontSize:12, marginTop:8, color: '#f00'}}>
             <p>Project なし</p>
           </div>}

          {milestone && <SmallMilestone issue={issue}/>}
        </div>
    );
}
