import React from 'react';

function diff (plan, result) {
    return plan - result;
}

const style = {
    right: {
        textAlign: 'right',
    },
};

export default function TdPointDiff (props) {
    const issue = props.issue;
    const point = issue.points();
    const point_result = point.results ? point.results.total : point.result;

    return (
        <td style={style.right}>
          {diff(point.plan, point_result)}
        </td>
    );
}
