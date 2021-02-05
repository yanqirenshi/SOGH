import React from 'react';

import ProductBacklogHeader from './ProductBacklogHeader.js';
import TablePointProductBacklog from './TablePointProductBacklog.js';
import TableSprintBacklogs from './TableSprintBacklogs.js';

export default function ProductBacklog (props) {
    const sogh = props.sogh;

    const project = props.project;

    return (
        <nav className="panel">
          <ProductBacklogHeader sogh={sogh}
                                project={project}
                                close={props.close}
                                callbacks={props.callbacks} />

          {!props.close &&
           <div className="panel-block">
             <TableSprintBacklogs project={project} />
           </div>}

          <div className="panel-block">
            <TablePointProductBacklog project={project} />
          </div>
        </nav>
    );
}
