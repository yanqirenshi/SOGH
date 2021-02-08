import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Sogh from '../js/Sogh.js';
import Filter from '../js/Filter.js';

import ProductBacklogs from './common/ProductBacklogs.js';

import Milestones from './sprint_planning/Milestones.js';
import TargetArea from './sprint_planning/TargetArea.js';
import Controller from './sprint_planning/Controller.js';

import style from  './sprint_planning/Styles.js';

export default function SprintPlanning (props) {
    const [sogh] = useState(new Sogh(props.token));
    const [filter] = useState(new Filter());
    const [changed, setChanged] = useState(null);

    const [milestones, setMilestones] = useState([]);
    const [milestone, setMilestone] = useState(undefined);
    const [issues, setIssues] = useState([]);
    const [issues_filterd, setIssuesFilterd] = useState([]);
    const [projects, setProjects] = useState({ht:{},list:[]});
    const [closeProjects, setCloseProjects] = useState({});

    const changeMilestone = (m) => {
        setIssues([]);
        setMilestone(m);
    };

    const fetchIssues = (m) => {
        if (m===undefined)
            return;

        const cb = (ret_issues) => setIssues(ret_issues);

        if (!m)
            sogh.getIssuesByRepository(props.repository, cb);
        else
            sogh.getIssuesByMilestone(m, cb);
    };

    useEffect(() => {
        sogh.getMilestonesByRepository(props.repository, (milestones) => {
            setMilestones(milestones);
        });
    }, [sogh]);

    useEffect(() => {
        const m_sorted = milestones.sort((a,b)=>a.dueOn<b.dueOn?-1:1);

        const now = moment();
        const trg = m_sorted.find(m => moment(m.dueOn).isAfter(now));

        if (trg)
            setMilestone(trg);
    }, [milestones]);

    useEffect(() => fetchIssues(milestone), [milestone]);

    useEffect(() => {
        const filterd_issue = sogh.filteringIssue(filter, issues);
        setProjects(sogh.issues2projects(filterd_issue));
    }, [issues, sogh, changed]);

    const changeFilter = (type, id) => {
        filter.change(type, id);
        setChanged(new Date());
    };

    const callbacks = {
        refresh: () => fetchIssues(milestone),
        filter: {
            click: (type, id) => changeFilter(type, id),
        },
        clickMilestone: (m) => changeMilestone(m),
        clearMilestone: () => changeMilestone(null),
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
    };

    const sorted_projects = sogh.sortProjectsByPriority(projects.list);

    return (
        <div style={style.root}>
          <div style={style.left}>
            <Milestones milestones={milestones}
                        milestone={milestone}
                        callbacks={callbacks} />
          </div>

          <div style={style.right}>

            <div style={{marginBottom: 11, display: 'flex'}}>
              <TargetArea milestone={milestone}
                          projects={projects}
                          sogh={sogh} />
            </div>

            <div style={{marginBottom: 22 }}>
              <div style={{marginBottom:11}}>
                <Controller issues={issues}
                            filter={filter}
                            callbacks={callbacks} sogh={sogh}/>
              </div>

              <ProductBacklogs projects={sorted_projects}
                               close_projects={closeProjects}
                               sogh={sogh}
                               callbacks={callbacks} />
            </div>
          </div>
        </div>
    );
}
