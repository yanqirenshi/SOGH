import React from 'react';

import ProductBacklog from './ProductBacklog.js';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
};

function buildSprintBacklogs (sogh, projects, close_projects, callbacks, productbacklog_url_prefix) {
    return projects.map(project => {
        const project_id = project.id();

        return (
            <ProductBacklog key={project_id}
                            project={project}
                            close={close_projects[project_id] || false}
                            sogh={sogh}
                            callbacks={callbacks}
                            productbacklog_url_prefix={productbacklog_url_prefix} />
        );
    });
}

export default function ProductBacklogs (props) {
    const sogh = props.sogh;
    const projects = props.projects;
    const close_projects = props.close_projects;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;
    const callbacks = props.callbacks;

    return (
        <div style={style}>
          {buildSprintBacklogs(sogh,
                               projects,
                               close_projects,
                               callbacks,
                               productbacklog_url_prefix)}
        </div>
    );
}
