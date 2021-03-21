import React from 'react';

import Project from './card_issue_close/Project.js';
import IssueTitle from './card_issue_close/IssueTitle.js';
import Milestone from './card_issue_close/Milestone.js';
import Labels from './card_issue_close/Labels.js';
import Asignees from './card_issue_close/Asignees.js';
import Column from './card_issue_close/Column.js';

const style = {
    root: {
        padding: '11px 0px 11px 0px',
    },
};

export default function CardIssueClose (props) {
    const sogh = props.sogh;
    const issue = props.issue;

    const s = {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft:11,
        paddingRight: 11,
    };

    return (
        <div className="box" style={style.root}>
          <Project issue={issue} />

          <Column issue={issue} />

          <IssueTitle issue={issue} />

          <div style={s}>
            <Labels issue={issue} sogh={sogh} />
            <Asignees issue={issue} />
          </div>

          <Milestone issue={issue} />
        </div>
    );
}
