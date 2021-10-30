import React from 'react';

import Labels from '../Labels.js';

function issueTitle (issue) {
    return (
        <>
          <p style={{fontWeight:'bold', fontSize:14}}>
            {issue.title()}
          </p>

          <div style={{marginTop:3, textAlign:'right'}}>
            <Labels issue={issue} split={10}/>
          </div>
        </>
    );
}

export default function TdIssueTitle (props) {
    const issue = props.issue;

    return (
        <td>
          {issue && issueTitle(issue)}
        </td>
    );
}
