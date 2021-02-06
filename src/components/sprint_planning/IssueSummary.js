import React from 'react';

export default function IssueSummary (props) {
    const source = props.source;

    const point_p = Math.floor(source.points.result / source.points.plan * 100);
    const issue_p = Math.floor(source.issues.close / (source.issues.open+source.issues.close) * 100);

    return (
        <div style={{...{display:'flex'}, ...props.style}}>
          <p>
            <strong>{props.label}:</strong>
          </p>

          <p style={{marginLeft:8}}>
            Points:
            <span> {source.points.plan}</span>,
            <span> {source.points.result}</span>,
            <span> {point_p}</span>%
          </p>

          <p style={{marginLeft:8}}>
            Issues:
            <span> {source.issues.open}</span>,
            <span> {source.issues.close}</span>,
            <span> {Math.floor(issue_p)}</span>%
          </p>
        </div>
    );
}
