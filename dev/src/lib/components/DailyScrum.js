import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Sogh from '../js/Sogh.js';
import Filter from '../js/Filter.js';
import ContentsArea  from './daily_scrum/ContentsArea.js';
import SprintListArea from './daily_scrum/SprintListArea.js';

import style from './daily_scrum/Style.js';

function targetMilestone (milestones) {
    const sorted = milestones.sort((a,b) => a.dueOn < b.dueOn ? -1 :1);
    const now = moment().add('d', '7');

    let trg = null;
    for (const m of sorted)
        if (now.isSameOrBefore(moment(m.dueOn)))
            return trg;
        else
            trg = m;

    return null;
}

export default function DailyScrum (props) {
    const [sogh] = useState(new Sogh(props.token));
    const [filter] = useState(new Filter());
    const [changed, setChanged] = useState(null);

    const [milestones, setMilestones] = useState([]);
    const [milestone, setMilestone] = useState(null);
    const [issues, setIssues] = useState([]);
    const [issues_filterd, setIssuesFilterd] = useState([]);
    const [projects, setProjects] = useState({ht:[],list:[]});
    const [projects_filterd, setProjectsFilterd] = useState({ht:[],list:[]});
    const [closeProjects, setCloseProjects] = useState({});

    const refresh = () => {
        if (issues.length>0)
            setIssues([]);

        sogh.getMilestonesByRepository(props.repository, (ret_milestones) => {
            setMilestones(ret_milestones);
        });
    };

    useEffect(refresh, [sogh]);
    useEffect(() => setMilestone(targetMilestone (milestones)), [milestones]);

    useEffect(() => {
        sogh.getIssuesByMilestone(milestone, (ret_issues) => setIssues(ret_issues));
    }, [milestone]);

    useEffect(() => {
        setProjects(sogh.issues2projects(issues));
        setIssuesFilterd(sogh.filteringIssue(filter, issues));
    }, [issues, sogh, changed]);

    useEffect(() => {
        setProjectsFilterd(sogh.issues2projects(issues_filterd));
    }, [sogh, issues_filterd]);

    const changeFilter = (type, id) => {
        filter.change(type, id);
        setChanged(new Date());
    };

    const setFilter = (type, v) => {
        filter.set(type, v);
        setChanged(new Date());
    };

    const callbacks = {
        refresh: () => refresh(),
        filter: {
            click: (type, id) => changeFilter(type, id),
        },
        clickOpenAllProductBacklogs: () => setCloseProjects({}),
        clickCloseAllProductBacklogs: () => setCloseProjects(projects.list.reduce((ht,d)=>{
            ht[d.id] = true;
            return ht;
        },{})),
        clickOpenProductBacklog: (id) => {
            const ht = {...closeProjects};

            if (ht[id])
                delete ht[id];

            setCloseProjects(ht);
        },
        clickCloseProductBacklog: (id) => {
            const ht = {...closeProjects};

            ht[id] = true;

            setCloseProjects(ht);
        },
        list_pb: {
            cleaAll:  () => setFilter('projects', projects.list.map(d=>d.id)),
            checkAll: () => setFilter('projects', []),
        }
    };

    return (
        <div style={style.root}>
          <div style={{flexGrow:1, overflow: 'auto'}}>
            <ContentsArea repository={props.repository}
                          milestone={milestone}
                          filter={filter}
                          issues={issues}
                          projects={projects}
                          projects_filterd={projects_filterd}
                          callbacks={callbacks}
                          close_projects={closeProjects}
                          sogh={sogh} />
          </div>

          <div style={{display:'flex', padding: 11, boxShadow: '0px 0px 8px #ccc'}}>
            <SprintListArea milestones={milestones}
                            issues={issues} />
          </div>
        </div>
    );
}
