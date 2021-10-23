import React from 'react';
import moment from 'moment';
import {LinkBlank} from './Links.js';

import SprintBacklogName from './table_issues/SprintBacklogName.js';
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

function due (v) {
    if (!v)
        return '';

    const m = moment(v);

    if (!m.isValid())
        return '';

    return m.format('MM-DD');
}

function prjPri (sogh, issue) {
    return sogh.priorityLabel(issue.project.priority());
}

function makeTrs (issue, sogh, productbacklog_url_prefix) {
    const point = issue.points();
    const point_result = point.results ? point.results.total : point.result;
    const project = issue.project;

    return (
        <tr key={issue.id()}>
          <td style={project.colorByPriority()}>
            {prjPri(sogh, issue)}
          </td>
          <td style={style.right}>
            <LinkBlank href={issue.url()}>
              {issue.number()}
            </LinkBlank>
          </td>
          <td>
            <SprintBacklogName issue={issue}
                               productbacklog_url_prefix={productbacklog_url_prefix}/>
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
                return (
                    <p key={issue.id()+'.'+a.id}>
                      {a.name || a.login}
                    </p>
                );
            })}
          </td>
          <td style={style.nowrap}>
            {due(issue.nextActionDate())}
          </td>
          <td style={style.right}>{point.plan}</td>
          <td style={style.right}>
            {point_result}
          </td>
          <td style={style.right}>
            {diff(point.plan, point_result)}
          </td>
          {/* <td style={style.nowrap}>{dt(issue.createdAt())}</td> */}
          <td style={style.nowrap}>{dt(issue.updatedAt())}</td>
          <td style={style.nowrap}>{dt(issue.closedAt())}</td>
        </tr>
    );
}

export default function TableIssues (props) {
    const sogh = props.sogh;
    const issues = props.issues;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    return (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th colSpan="4">Sprint Backlog</th>
              <th colSpan="2">Management</th>
              <th colSpan="2">Work</th>
              <th colSpan="3">Point</th>
              {/* <th>Create</th> */}
              <th>Update</th>
              <th>Close</th>
            </tr>
            <tr>
              <th>優</th>
              <th>#</th>
              <th>Title</th>
              <th style={style.nowrap}>Labels</th>
              <th style={style.nowrap}>Owner</th>
              <th style={style.nowrap}>Due</th>
              <th style={style.nowrap}>Assignees</th>
              <th style={style.nowrap}>Next</th>
              <th>Plan</th>
              <th>Result</th>
              <th>Diff</th>
              {/* <th>At</th> */}
              <th>At</th>
              <th>At</th>
            </tr>
          </thead>

          <tbody>
            {issues.map(d => makeTrs(d, sogh, productbacklog_url_prefix))}
          </tbody>
        </table>
    );
}
