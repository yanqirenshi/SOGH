import React from 'react';

import {LinkBlank} from '../Links.js';

export default function TdProjectPriority (props) {
    const issue = props.issue;
    const project = issue.project;

    return (
          <td style={project.colorByPriority()}>
            {project.priorityLabel()}
          </td>
    );
}
