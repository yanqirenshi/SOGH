import React from 'react';

import ProductBacklog from './ProductBacklog.js';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
};

function buildSprintBacklogs (sogh, props, projects) {
    const close_projects = props.close_projects;

    return projects.map(d => {
        return <ProductBacklog key={d.id}
                               project={d}
                               close={close_projects[d.id] || false}
                               sogh={sogh}
                               callbacks={props.callbacks}
                               productbacklog_url_prefix={props.productbacklog_url_prefix} />;
    });
}

export default function ProductBacklogs (props) {
    const sogh = props.sogh;

    return (
        <div style={style}>
          {buildSprintBacklogs(sogh, props, props.projects)}
        </div>
    );
}
