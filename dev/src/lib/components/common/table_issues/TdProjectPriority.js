import React from 'react';

export default function TdProjectPriority (props) {
    const issue = props.issue;
    const project = issue.project;

    return (
          <td style={project.colorByPriority()}>
            {project.priorityLabel()}
          </td>
    );
}
