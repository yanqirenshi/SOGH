import React from 'react';

import CardIssueClose from './CardIssueClose.js';

const style = {
    root: {
        width: 200,
        height: 'auto',
        marginBottom: 20,
    },
};

export default function CardIssue (props) {
    const sogh = props.sogh;

    return (
        <div className="sogh-card-item" style={style.root}>
          <CardIssueClose issue={props.issue} sogh={sogh} />
        </div>
    );
}
