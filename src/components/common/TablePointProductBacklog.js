import React from 'react';

export default function TablePointProductBacklog (props) {
    const data = props.issues.reduce((out, issue)=>{
        out.points.plan += issue.point.plan || 0;
        out.points.result += issue.point.result || 0;

        if (issue.closedAt)
            out.issues.close += 1;
        else
            out.issues.open += 1;

        return out;
    },{
        points: { plan: 0, result: 0 },
        issues: { open: 0, close: 0 },
    });

    return (
        <div style={{display: 'flex', paddingLeft: 11}}>
          <p>
            <strong>Points:</strong>
            <span> {data.points.plan}</span>,
            <span> {data.points.result}</span>,
            <span> {Math.floor(data.points.result / data.points.plan * 100)}</span>%
          </p>
          <p style={{marginLeft:22}}>
            <strong>Issues:</strong>
            <span> {data.issues.open}</span>,
            <span> {data.issues.close}</span>,
            <span> {Math.floor(data.issues.close / (data.issues.open+data.issues.close) * 100)}</span>%
          </p>
        </div>
    );
}
