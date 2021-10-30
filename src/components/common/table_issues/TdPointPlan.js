import React from 'react';

export default function TdPointPlan (props) {
    const issue = props.issue;

    return (
        <td>{issue.pointPlansTotal()}</td>
    );
}
