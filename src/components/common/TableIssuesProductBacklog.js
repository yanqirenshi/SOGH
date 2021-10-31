import React from 'react';

import * as ti from './table_issues/index.js';

export default function TableIssuesProductBacklog (props) {
    const project = props.project;
    const issues = project.issues();
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    return (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th rowSpan="2">Column</th>
              <th rowSpan="2">#</th>
              <th rowSpan="2">Title</th>
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
            {issues.map(issue => (
                <tr key={issue.id()}>
                  <ti.TdProjectColumn issue={issue} project={project}/>
                  <ti.TdNumber issue={issue}/>
                  <ti.TdIssueTitleMilestone issue={issue}
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
