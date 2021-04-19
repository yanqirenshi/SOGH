import React from 'react';

import CardIssueClose from './CardIssueClose.js';

export default function CardIssue (props) {
    const sogh = props.sogh;

    const style = {
        root: {
            width: props.w || 200,
            height: 'auto',
            marginBottom: 20,
        },
    };

    return (
        <div className="sogh-card-item" style={style.root}>
          <CardIssueClose issue={props.issue} sogh={sogh} />
        </div>
    );
}
