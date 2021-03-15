import React from 'react';

import DueDateHeader from './DueDateHeader.js';
import TableIssues from './TableIssues.js';

export default function DueDate (props) {
    const sogh = props.sogh;

    const title = props.title;
    const issues = props.issues;

    return (
        <nav className="panel">
          <DueDateHeader sogh={sogh}
                         date={title}
                         close={props.close}
                         callbacks={props.callbacks} />

          <div className="panel-block">
            <TableIssues issues={issues} />
          </div>

          <div className="panel-block">
          </div>
        </nav>
    );
}
