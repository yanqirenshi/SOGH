import React from 'react';
import moment from 'moment';

import Labels from '../common/Labels.js';

function makeProjectColumn (d, project) {
    const cards = d.projectCards();

    if (cards.length===0)
        return '';

    const target = cards.find(d => d.column.project.id===project.id());

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

function makeTr (issue, project) {
    const point_result = issue.pointResultTotal();

    return (
        <tr key={issue.id()}>
          <td style={{whiteSpace: 'nowrap'}}>
            {makeProjectColumn(issue, project)}
          </td>
          <td>
            <a href={issue.url()} target="_blank" rel="noreferrer">
              {issue.number()}
            </a>
          </td>
          <td>
            {issue.title()}
          </td>
          <td>
            <Labels issue={issue}/>
          </td>
          <td style={{whiteSpace: 'nowrap'}}>
            {issue.owner()}
          </td>
          <td style={{whiteSpace: 'nowrap'}}>
            {due(issue.dueDate())}
          </td>
          <td>
            {issue.assignees().map(a => {
                return (
                    <p key={issue.id() + '.' + a.id}>
                      {a.name || a.login}
                    </p>
                );
            })}
          </td>
          <td style={{whiteSpace: 'nowrap'}}>
            {due(issue.nextActionDate())}
          </td>
          <td>{issue.pointPlansTotal()}</td>
          <td>{point_result}</td>
          <td style={{whiteSpace: 'nowrap'}}>
            {due(issue.updatedAt())}
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
