import React from 'react';
import moment from 'moment';

function due (v) {
    if (!v)
        return '';

    const m = moment(v);

    if (!m.isValid())
        return '';

    return m.format('MM-DD ddd');
}

export default function TdDueDate (props) {
    const issue = props.issue;

    return (
        <td style={{whiteSpace: 'nowrap'}}>
          {due(issue.dueDate())}
        </td>
    );
}
