import React, { useState, useEffect } from 'react';

import Hero from './product_backlog/Hero.js';
import Milestones from './product_backlog/Milestones.js';

function getProjectByID (id, sogh, setProject) {
    sogh.getProjectByID(id, (project) => setProject(project));
}

function getIssuesByProject (repository, project, sogh, setIssues) {
    if (!project)
        return;

    sogh.getIssuesByRepositoryProject(repository, project, (issues) => setIssues(issues));
}

function makeMilestones (issues) {
    const ht = issues.reduce((ht, d) => {
        const milestone_id = d.milestone ? d.milestone.id : null;

        if (!ht[milestone_id])
            ht[milestone_id] = d.milestone ||
            {
                id: null,
                title: "未割り当て",
                issues: [],
                labels: {nodes: []},
                dueOn: null,
            };

        if (!ht[milestone_id].issues)
            ht[milestone_id].issues = [];

        ht[milestone_id].issues.push(d);

        return ht;
    }, {});

    return Object.values(ht).sort((a,b) => a.dueOn < b.dueOn ? 1 : -1);
}

export default function ProductBacklog (props) {
    const [tabs] = useState([
        { code: 'milestones', label: 'Milestones', selected: true },
        // { code: 'columns',    label: 'Columns',    selected: false },
    ]);
    const [project, setProject] = useState(null);
    const [issues, setIssues] = useState([]);
    const [milestones, setMilestones] = useState([]);

    const sogh = props.sogh;

    useEffect(() => getProjectByID(props.project_id, sogh, setProject), [sogh]);
    useEffect(() => getIssuesByProject(props.repository, project, sogh, setIssues), [project]);
    useEffect(() => setMilestones(makeMilestones(issues)), [issues]);

    return (
        <div>
          <Hero project={project}
                tabs={tabs}
                root_url={props.root_url}/>

          <Milestones milestones={milestones} project={project} />
        </div>
    );
}
