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

export default function TdMilestone (props) {
    const issue = props.issue;
    const milestone = issue.milestone();

    if (!milestone) return <td></td>;

    return (
        <td>
          {milestone.title.replace('【スプリント】','')} ({milestoneNum(milestone)})
        </td>
    );
}
