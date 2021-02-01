import React from 'react';

import ProductBacklog from './ProductBacklog.js';

function buildSprintBacklogs (sogh, props, projects) {
    const close_projects = props.close_projects;

    return projects.map(d => {
        return <ProductBacklog key={d.id}
                               project={d}
                               close={close_projects[d.id] || false}
                               sogh={sogh}
                               callbacks={props.callbacks} />;
    });
}

export default function ProductBacklogs (props) {
    const sogh = props.sogh;

    return (
        <div>
          {buildSprintBacklogs(sogh, props, props.projects)}
        </div>
    );
}
