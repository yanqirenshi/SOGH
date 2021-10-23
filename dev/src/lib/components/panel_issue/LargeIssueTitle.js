import React from 'react';

import ANewTab from './ANewTab.js';

const style = {
    marginTop:6,
    fontWeight:'bold',
    paddingLeft: 11,
    paddingRight: 11,
};

export default function LargeIssueTitle (props) {
    const issue = props.issue;

    return (
        <div style={style}>
          <p>
            {issue.title()}

            <span style={{marginLeft:11}}>(</span>
            <ANewTab href={issue.url()}>
              {issue.number()}
            </ANewTab>
            <span>)</span>
          </p>
        </div>
    );
}
