import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import Hero from './Hero.js';
import Milestones from './Milestones.js';
import Columns from './Columns.js';

function getProjectByID (id, sogh, setProject) {
    sogh.getProjectByID(id, (project) => setProject(project));
}

function ensureMilestone (issue, milestones) {
    const milestone_id = issue.milestone ? issue.milestone.id : null;

    if (milestones[milestone_id])
        return milestones[milestone_id];

    const milestone = milestone_id ? {...issue.milestone} : {
            id: null,
            title: "未割り当て",
            labels: {nodes: []},
            dueOn: null,
        };

    milestone.issues = [];

    milestones[milestone_id] = milestone;

    return milestone;
};

function ensureColumn (card, columns) {
    const column_id = card.column.id;

    if (columns[column_id])
        return columns[column_id];

    const column = {...card.column};

    column.issues = [];

    columns[column_id] = column;

    return column;
};

function makeContents (project, issues) {
    const milestones = {};
    const columns = {};

    for (const issue of issues) {
        const milestone = ensureMilestone (issue, milestones);
        milestone.issues.push(issue);

        const card = issue.projectCards.nodes.find(d=>d.column.project.id===project.id);
        const column = ensureColumn(card, columns);
        column.issues.push(issue);
    }

    const sorter_m = (a,b) => a.dueOn < b.dueOn ? 1 : -1;
    const sorter_c = (a,b) => a.name  < b.name ? -1 : 1;

    return {
        milestones: { ht: milestones, list: Object.values(milestones).sort(sorter_m) },
        columns:    { ht: columns,    list: Object.values(columns).sort(sorter_c) },
    };
}

export default function Contents (props) {
    const [tabs] = useState([
        { code: 'milestones', label: 'Milestones', selected: true },
        { code: 'columns',    label: 'Columns',    selected: false },
    ]);
    const [project, setProject] = useState(null);
    const [issues, setIssues] = useState([]);
    const [constens, setConstens] = useState({
        milestones: { ht: {}, list: [] },
        columns:    { ht: {}, list: [] },
    });

    const sogh = props.sogh;

    useEffect(() => getProjectByID(props.project_id, sogh, setProject), []);
    useEffect(() => {
        if (!project)
            return;

        setConstens({
            milestones: { ht: {}, list: [] },
            columns:    { ht: {}, list: [] },
        });
        setIssues([]);

        let issues_tmp = [];
        let i = 0;

        // TODO: Use Promis
        for (const column of project.columns.nodes) {
            i++;

            sogh.getIssuesByProjectColumn(column, (ret)=> {
                i--;
                issues_tmp = issues_tmp.concat(ret);

                if (i>0)
                    return;
                setIssues(issues_tmp);
            });
        }
    }, [project]);

    useEffect(() => {
        setConstens(makeContents(project, issues));
    }, [issues]);

    const location = useLocation();
    const selected_tab_code = new URLSearchParams(location.search).get('tab');
    const selected_tab = tabs.find(d=>d.code===selected_tab_code) || tabs[0];

    return (
        <>
          {project && <div>
                      <Hero sogh={sogh}
                            project={project}
                            tabs={tabs}
                            selected_tab={selected_tab}
                            root_url={props.root_url}/>

                        {selected_tab.code==='milestones'
                         && <Milestones milestones={constens.milestones.list}
                                        project={project} />}
                        {selected_tab.code==='columns'
                         && <Columns columns={constens.columns.list}
                                     project={project} />}
                    </div>}
        </>
    );
}
