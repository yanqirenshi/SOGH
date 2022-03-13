import React from 'react';

import {s2d} from '../../../js/Utilities.js';

function due (v) {
    const m = s2d(v);

    return m ? m.format('MM-DD ddd') : '';
}

export default function TdDueDate (props) {
    const issue = props.issue;

    return (
        <td style={{whiteSpace: 'nowrap'}}>
          {due(issue.dueDate())}
        </td>
    );
}
