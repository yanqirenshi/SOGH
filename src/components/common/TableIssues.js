import React from 'react';

import * as ti from './table_issues/index.js';

const style = {
    nowrap: {
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
};

export default function TableIssues (props) {
    const issues = props.issues;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    return (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th colSpan="3">Sprint Backlog</th>
              <th colSpan="2">Management</th>
              <th colSpan="2">Work</th>
              <th colSpan="3">Point</th>
              <th>Close</th>
            </tr>
            <tr>
              <th>優</th>
              <th>#</th>
              <th>Title</th>
              <th style={style.nowrap}>Owner</th>
              <th style={style.nowrap}>Due</th>
              <th style={style.nowrap}>Assignees</th>
              <th style={style.nowrap}>Next</th>
              <th>Plan</th>
              <th>Result</th>
              <th>Diff</th>
              <th>At</th>
            </tr>
          </thead>

          <tbody>
            {issues.map(issue => (
                <tr key={issue.id()}>
                  <ti.TdProjectPriority issue={issue}/>
                  <ti.TdNumber issue={issue}/>
                  <ti.TdIssueTitleFull issue={issue}
                                       productbacklog_url_prefix={productbacklog_url_prefix}/>
                  <ti.TdOwner issue={issue}/>
                  <ti.TdDueDate issue={issue}/>
                  <ti.TdAssignees issue={issue}/>
                  <ti.TdNextActionDate issue={issue}/>
                  <ti.TdPointPlan issue={issue}/>
                  <ti.TdPointResult issue={issue}/>
                  <ti.TdPointDiff issue={issue}/>
                  <ti.TdClosedAt issue={issue}/>
                </tr>
            ))}
          </tbody>
        </table>
    );
}
