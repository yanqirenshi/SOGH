import React from 'react';

import ANewTab from './ANewTab.js';

const style = {
    fontSize:12,
    marginTop:8
};

export default function Milestone (props) {
    const issue = props.issue;

    const milestone = issue.milestone;

    return (
        <div style={style}>
          <p>
            <ANewTab href={milestone.url}>
              {milestone.title}
            </ANewTab>
          </p>
        </div>
    );
}
