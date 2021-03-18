import React from 'react';

import DueDateHeader from './DueDateHeader.js';
import TableIssues from './TableIssues.js';
import TablePointProductBacklog from './TablePointProductBacklog.js';

export default function DueDate (props) {
    const sogh = props.sogh;

    const title = props.title;
    const issues = props.issues;

    const issues_sorted =  sogh.sortIssuesByProjectAndPriority(issues);

    return (
        <nav className="panel">
          <DueDateHeader sogh={sogh}
                         date={title}
                         close={props.close}
                         callbacks={props.callbacks} />

          <div className="panel-block">
            <TableIssues issues={issues_sorted} sogh={sogh} />
          </div>

          <div className="panel-block">
            <TablePointProductBacklog issues={issues || []} />
          </div>
        </nav>
    );
}
