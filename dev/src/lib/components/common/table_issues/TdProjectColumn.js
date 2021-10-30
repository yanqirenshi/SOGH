import React from 'react';

function makeProjectColumn (d, project) {
    const cards = d.projectCards();

    if (cards.length===0)
        return '';

    const target = cards.find(d => d.column.project.id===project.id());

    if (!target)
        return '';

    return (
        <p style={{fontSize:12}}>
          {target.column.name}
        </p>
    );
}

export default function TdProjectColumn (props) {
    const issue = props.issue;
    const project = props.project;

    return (
        <td style={{minWidth:88, maxWidth:111}}>
          {makeProjectColumn(issue, project)}
        </td>
    );
}
