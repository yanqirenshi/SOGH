import React from 'react';
import {LinkBlank} from '../Links.js';

import Labels from '../Labels.js';

function milestoneNum (milestone) {
    return (
        <LinkBlank href={milestone.url}>
          {milestone.number}
        </LinkBlank>
    );
}

export default function TdIssueTitleMilestone (props) {
    const issue = props.issue;
    const milestone = issue.milestone();

    return (
        <td>
          <p style={{fontWeight:'bold', fontSize:14}}>
            {issue.title()}
          </p>

          {milestone &&
           <div style={{display:'flex', fontSize:12}}>
             <div>
               {milestone.title.replace('【スプリント】','')} ({milestoneNum(milestone)})
             </div>
           </div>}

          <div style={{marginTop:3, textAlign:'right'}}>
            <Labels issue={issue} split={10}/>
          </div>
        </td>
    );
}
