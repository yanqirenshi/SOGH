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

          <div className="container" style={{marginTop:22}}>
            <pre>
              {props.project.body()}
            </pre>
          </div>
        </section>
    );
}
