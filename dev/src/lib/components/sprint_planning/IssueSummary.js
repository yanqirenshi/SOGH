import React from 'react';

export default function IssueSummary (props) {
    const source = props.source;

    const point_p = Math.floor(source.points.result / source.points.plan * 100);
    const issue_p = Math.floor(source.issues.close / (source.issues.open+source.issues.close) * 100);

    return (
        <div style={{...{display:'flex'}, ...props.style}}>
          <p>
            {props.label}:
          </p>

          <p style={{marginLeft:8}}>
            <strong>Points:</strong>
            <span> {source.points.plan}</span>,
            <span> {source.points.result}</span>,
            <span> {point_p}</span>%
          </p>

          <p style={{marginLeft:8}}>
            <strong>Issues:</strong>
            <span> {source.issues.open}</span>,
            <span> {source.issues.close}</span>,
            <span> {Math.floor(issue_p)}</span>%
          </p>
        </div>
    );
}
