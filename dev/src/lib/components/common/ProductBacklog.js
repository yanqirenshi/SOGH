import React from 'react';

import ProductBacklogHeader from './ProductBacklogHeader.js';
import TablePointProductBacklog from './TablePointProductBacklog.js';
import TableSprintBacklogs from './TableSprintBacklogs.js';

const style = {
    maxWidth: 1000,
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
                                callbacks={props.callbacks} />

          {!props.close &&
           <div className="panel-block">
             <TableSprintBacklogs project={project} />
           </div>}

          <div className="panel-block">
            <TablePointProductBacklog issues={project.issues || []} />
          </div>
        </nav>
    );
}
