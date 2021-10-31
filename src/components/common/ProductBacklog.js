import React from 'react';

import ProductBacklogHeader from './ProductBacklogHeader.js';
import TableIssuesProductBacklog from './TableIssuesProductBacklog.js';
import TablePointProductBacklog from './TablePointProductBacklog.js';

const style = {
    marginLeft: 22,
};

export default function ProductBacklog (props) {
    const sogh = props.sogh;

    const project = props.project;

    return (
        <nav className="panel" style={style}>
          <ProductBacklogHeader sogh={sogh}
                                project={project}
                                close={props.close}
                                callbacks={props.callbacks}
                                productbacklog_url_prefix={props.productbacklog_url_prefix} />

          {!props.close &&
           <div className="panel-block">
             <TableIssuesProductBacklog project={project} />
           </div>}

          <div className="panel-block">
            <TablePointProductBacklog issues={project.issues() || []} />
          </div>
        </nav>
    );
}
