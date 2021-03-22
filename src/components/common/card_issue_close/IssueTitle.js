import React from 'react';

export default function IssueTitle (props) {
    const issue = props.issue;

    const style = {
        root: {
            paddingLeft:22,
            paddingRight: 22,
            marginTop:11,
            marginBottom:11
        },
        name: {
            fontWeight: 'bold',
        },
        num: {
            color: '#333',
            fontWeight: 'normal',
            marginLeft: 8,
            fontSize: 12,
        },
        numa: {
            color: '#333',
            fontWeight: 'normal',
            fontSize: 12,
        },
    };

    return (
        <div style={style.root}>
          <p style={style.name}>
            {issue.title}
            <span style={style.num}>
              (
              <a style={style.numa}
                 href={issue.url}
                 target="_blank"
                 rel="noreferrer">
                {issue.number}
              </a>
              )
            </span>
          </p>
        </div>
    );
}
