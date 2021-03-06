import React from 'react';
import moment from 'moment';

import Labels from '../common/Labels.js';

function makeLabels (d,i) {
    const aStyle = (hexcolor) => {
        var r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
        var g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
        var b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

        const color = ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;

        return color;
    };

    const style = {
        whiteSpace: 'nowrap',
        background: '#' + d.color,
        color: aStyle('#' + d.color),
        padding: '3px 6px',
        borderRadius: 5,
        fontSize: 12,
        textAlign: 'center',
        marginTop: i===0 ? 0 : 3,
        marginRight: 6,
        display: 'inline-block',
    };

    return <p key={d.id} style={style}>
             {d.name}
           </p>;
}

function makeProjectColumn (d, project) {
    const cards = d.projectCards.nodes;

    if (cards.length===0)
        return '';

    const target = cards.find(d => d.column.project.id===project.id);

    if (!target)
        return '';

    return <p>{target.column.name}</p>;
}

function due (v) {
    if (!v)
        return '';

    const m = moment(v);

    if (!m.isValid())
        return '';

    return m.format('MM-DD ddd');
}

function makeTr (d, project) {
    const issue = d;
    const point_result = issue.point.results ? issue.point.results.total : issue.point.result;

    return (
        <tr key={d.id}>
          <td style={{whiteSpace: 'nowrap'}}>{makeProjectColumn(d, project)}</td>
          <td>
            <a href={d.url} target="_blank" rel="noreferrer">
              {d.number}
            </a>
          </td>
          <td>
            {d.title}
          </td>
          <td>
            <Labels issue={issue}/>
          </td>
          <td style={{whiteSpace: 'nowrap'}}>
            {issue.owner}
          </td>
          <td style={{whiteSpace: 'nowrap'}}>{due(d.due_date)}</td>
          <td>
            {d.assignees.nodes.map(a => {
                return <p key={d.id+'.'+a.id}>
                         {a.name || a.login}
                       </p>;
            })}
          </td>
          <td style={{whiteSpace: 'nowrap'}}>
            {due(issue.date_next_action)}
          </td>
          <td>{d.point.plan}</td>
          <td>{point_result}</td>
          <td style={{whiteSpace: 'nowrap'}}>
            {due(d.updatedAt)}
          </td>
        </tr>
    );
}

export default function MilestoneIssuesTable (props) {
    const project = props.project;
    const issues = props.issues;

    return (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Project</th>
              <th colSpan="3">Issue</th>
              <th colSpan="2">Manegement</th>
              <th colSpan="2">Work</th>
              <th colSpan="2">Point</th>
              <th>Updated</th>
            </tr>
            <tr>
              <th>Column</th>
              <th>#</th>
              <th>Title</th>
              <th>Labels</th>
              <th>Owner</th>
              <th>Due</th>
              <th>Assignees</th>
              <th>Next</th>
              <th>Plan</th>
              <th>Result</th>
              <th>At</th>
            </tr>
          </thead>

          <tbody>
            {issues.map(d => makeTr(d, project))}
          </tbody>
        </table>
    );
}
