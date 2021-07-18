import React from 'react';

import DueDateHeader from './DueDateHeader.js';
import TableIssues from './TableIssues.js';
import TablePointProductBacklog from './TablePointProductBacklog.js';

const style = {
    marginLeft: 22,
};

export default function DueDate (props) {
    const sogh = props.sogh;
    const title = props.title;
    const issues = props.issues;
    const callbacks = props.callbacks;
    const close = props.close;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    const issues_sorted =  sogh.sortIssuesByProjectAndPriority(issues);

    return (
        <nav className="panel" style={style}>
          <DueDateHeader sogh={sogh}
                         date={title}
                         close={close}
                         callbacks={callbacks} />

          {!close &&
           <div className="panel-block">
             <TableIssues issues={issues_sorted}
                          sogh={sogh}
                          productbacklog_url_prefix={productbacklog_url_prefix} />
           </div>}

          <div className="panel-block">
            <TablePointProductBacklog issues={issues} />
          </div>
        </nav>
    );
}
