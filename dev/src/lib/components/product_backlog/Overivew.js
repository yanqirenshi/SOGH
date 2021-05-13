import React from 'react';

import TableIssueCountParsonColumn from './TableIssueCountParsonColumn.js';

export default function Overivew (props) {
    const data = props.data;
    // console.log(props.project.plan);
    // console.log(props.project.result);
    // console.log(props.project.progress);
    // console.log(props.project.assignee);
    // console.log(props.project.body);
    return (
        <section className="section" style={props.style}>
          <div className="container">
            <TableIssueCountParsonColumn core={props.core}
                                         assignees={data.assignees}
                                         columns={data.columns} />
          </div>
        </section>
    );
}
