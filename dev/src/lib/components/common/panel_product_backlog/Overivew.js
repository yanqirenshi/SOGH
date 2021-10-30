import React from 'react';

import TableIssueCountParsonColumn from './TableIssueCountParsonColumn.js';

export default function Overivew (props) {
    const data = props.data;

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
