import React from 'react';

import * as ti from './table_issues/index.js';

export default function TableIssuesMilestones (props) {
    const project = props.project;
    const issues = props.issues;

    return (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th>Project</th>
              <th colSpan="2">Issue</th>
              <th colSpan="2">Manegement</th>
              <th colSpan="2">Work</th>
              <th colSpan="2">Point</th>
            </tr>
            <tr>
              <th>Column</th>
              <th>#</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Due</th>
              <th>Assignees</th>
              <th>Next</th>
              <th>Plan</th>
              <th>Result</th>
            </tr>
          </thead>

          <tbody>
            {issues.map(issue => {
                return (
                    <tr key={issue.id()}>
                      <ti.TdProjectColumn issue={issue} project={project}/>
                      <ti.TdNumber issue={issue}/>
                      <ti.TdIssueTitle issue={issue}/>
                      <ti.TdOwner issue={issue}/>
                      <ti.TdDueDate issue={issue}/>
                      <ti.TdAssignees issue={issue}/>
                      <ti.TdNextActionDate issue={issue}/>
                      <ti.TdPointPlan issue={issue}/>
                      <ti.TdPointResult issue={issue}/>
                    </tr>
                );
            })}
          </tbody>
        </table>
    );
}
