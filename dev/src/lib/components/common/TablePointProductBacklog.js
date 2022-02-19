import React from 'react';

function sumRecord (record, issue) {
    const point = issue.points();

    record.points.plan += point.plan || 0;

    record.points.result += ((point.results ? point.results.total : point.result) || 0);

    if (issue.closedAt)
        record.issues.close += 1;
    else
        record.issues.open += 1;

    return record;
}

function drawPoints (plan, result) {
    let status;
    if (plan===0 || result===0)
        status = `${result}/${plan}`;
    else
        status = `${Math.floor(result / plan * 100)} %`;

    return (
        <>
          <span style={{marginLeft:6}}>
            {Math.ceil(plan)}
          </span>,

          <span style={{marginLeft:8}}>
            {Math.ceil(result)}
          </span>,

          <span style={{marginLeft:8}}>
            {status}
          </span>
        </>
    );
}

export default function TablePointProductBacklog (props) {
    const issues = props.issues || [];

    const record = {
        points: { plan: 0, result: 0 },
        issues: { open: 0, close: 0 },
    };

    const data = issues.reduce(sumRecord, record);

    return (
        <div style={{display: 'flex', paddingLeft: 11}}>
          <p>
            <strong>Points:</strong>
            {drawPoints(data.points.result, data.points.plan)}
          </p>
          <p style={{marginLeft:22}}>
            <strong>Issues:</strong>
            {drawPoints(data.issues.open + data.issues.close, data.issues.close)}
          </p>
        </div>
    );
}
