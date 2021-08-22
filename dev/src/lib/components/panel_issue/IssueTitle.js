import React from 'react';

import ANewTab from './ANewTab.js';

const style = {
    marginTop:6,
    fontWeight:'bold',
};

export default function IssueTitle (props) {
    const issue = props.issue;

    return (
        <div style={style}>
          <p>
            {issue.title}

            <span style={{marginLeft:11}}>(</span>
            <ANewTab href={issue.url}>
              {issue.number}
            </ANewTab>
            <span>)</span>
          </p>
        </div>
    );
}
