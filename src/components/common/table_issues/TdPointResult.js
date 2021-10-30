import React from 'react';

export default function TdPointResult (props) {
    const issue = props.issue;

    const point_result = issue.pointResultTotal();

    return (
        <td>
          {point_result}
        </td>
    );
}
