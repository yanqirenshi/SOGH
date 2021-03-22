import React from 'react';

export default function Milestone (props) {
    const milestone = props.issue.milestone;

    if (!milestone)
        return null;

    // dueOn: "2021-03-19T00:00:00Z"
    // number: 34
    // state: "OPEN"

    const style = {
        root: {
            paddingLeft:11,
            paddingRight: 11,
            fontSize:12,
        },
    };

    return (
        <div style={style.root}>
          <p>
            <a href={milestone.url} target="_blank" rel="noreferrer">
              {milestone.title}
            </a>
          </p>
        </div>
    );
}
