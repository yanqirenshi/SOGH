import React from 'react';
import moment from 'moment';
import {LinkBlank} from './Links.js';
import Labels from './Labels.js';

function dt (v) {
    if (!v) return '';

    return moment(v).format('MM-DD');
}

const style = {
    nowrap: {
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
    right: {
        textAlign: 'right',
    },
};

function diff (plan, result) {
    return plan - result;
}

function prjColumn (issue) {
    return issue.projectCards().map(d=>{
        return (
            <p key={d.column.id}>
              {d.column.name}
            </p>
        );
    });
}

function due (v) {
    if (!v)
        return '';

    const m = moment(v);

    if (!m.isValid())
        return '';

    return m.format('MM-DD');
}

function makeTrs (issue) {
    const point_result = issue.pointResultTotal();
    const point_plan   = issue.pointPlansTotal();

    return (
        <tr key={issue.id()}>
          <td style={style.right}>
            <LinkBlank href={issue.url()}>
              {issue.number()}
            </LinkBlank>
          </td>

          <td>
            <div style={{fontSize: 12}}>{prjColumn(issue)}</div>
            <p>{issue.title()}</p>
          </td>

          <td>
            <Labels issue={issue}/>
          </td>

          <td style={style.nowrap}>
            {issue.owner()}
          </td>

          <td style={style.nowrap}>
            {due(issue.dueDate())}
          </td>

          <td style={style.nowrap}>
            {issue.assignees().map(a => {
                return <span key={issue.id+'.'+a.id}>
                          {a.name || a.login}
                        </span>;
            })}
          </td>

          <td style={style.nowrap}>
            {due(issue.nextActionDate())}
          </td>

          <td style={style.right}>{point_plan}</td>

          <td style={style.right}>
            {point_result}
          </td>

          <td style={style.right}>
            {diff(point_plan, point_result)}
          </td>

          <td style={style.nowrap}>{dt(issue.closedAt())}</td>
        </tr>
    );
}

export default function TableSprintBacklogs (props) {
    const project = props.project;
    const issues = project.issues();

    return (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">Title</th>
              <th rowSpan="2">Labels</th>
              <th colSpan="2">Manegement</th>
              <th colSpan="2">Work</th>
              <th colSpan="3">Point</th>
              <th>Close</th>
            </tr>
            <tr>
              <th>Owner</th>
              <th>Due</th>
              <th>Assignees</th>
              <th>Next</th>
              <th>Plan</th>
              <th>Result</th>
              <th>Diff</th>
              <th>At</th>
            </tr>
          </thead>

          <tbody>
            {issues.map(d => makeTrs(d))}
          </tbody>
        </table>
    );
}
