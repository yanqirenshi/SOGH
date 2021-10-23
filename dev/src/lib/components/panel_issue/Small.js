import React from 'react';

import Labels           from './Labels.js';
import NextActionDate   from './NextActionDate.js';
import SmallIssueTitle  from './SmallIssueTitle.js';
import SmallDueDate     from './SmallDueDate.js';
import SmallProjectName from './SmallProjectName.js';
import SmallMilestone   from './SmallMilestone.js';

export default function Small (props) {
    const issue = props.issue;
    const callback = props.callback;

    const milestone = issue.milestone();

    const column = issue.getColumnFirst();

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

          <div style={{marginTop:8}}>
            <NextActionDate type="s" issue={issue} callback={callback} />
          </div>
        </div>
    );
}
