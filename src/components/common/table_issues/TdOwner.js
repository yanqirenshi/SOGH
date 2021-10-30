import React from 'react';

export default function TdOwner (props) {
    const issue = props.issue;

    return (
        <td style={{whiteSpace: 'nowrap'}}>
          {issue.owner()}
        </td>
    );
}
