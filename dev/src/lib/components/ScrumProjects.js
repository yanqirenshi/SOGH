import React, { useState, useEffect } from 'react';

import NotSignIn           from './common/NotSignIn.js';
import ButtonRefresh       from './common/ButtonRefresh.js';
import ProductBacklogs     from './common/ProductBacklogs.js';
import ProductAndMilestone from './common/ProductAndMilestone.js';
import Filter              from './common/Filter.js';
import ChartBardown        from './common/ChartBardown.js';
import OperatorOpenClose   from './common/OperatorOpenClose.js';
import Summary             from './common/Summary.js';

const style = {
    root: {
        marginBottom:111
    },
    head: {
        padding: '11px 22px 0px 22px'
    },
    controller: {
        padding: '0px 22px 8px 22px',
        display:'flex',
    },
    body: {
        display:'flex',
        padding: '11px 22px'
    },
};

export default function ScrumProjects (props) {
    const [scrum, setScrum] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);

    const sogh = props.sogh;
    const repository = props.repository;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    const invokeUpdate = ()=> setUpdatedAt(new Date());
    const refresh = ()=> scrum.fetch(repository, ()=> invokeUpdate());

    useEffect(()=> sogh && setScrum(sogh.scrum()), [repository]);
    useEffect(()=> { if (scrum) refresh(); }, [scrum]);

    if (!scrum) return <NotSignIn/>;

    const callbacks = {
        refresh: ()=> refresh(),
        filter: {
            click: (type, id)=> scrum.changeFilter('projects', type, id, invokeUpdate),
            keyword: {
                change: (val)=> scrum.changeFilter('projects', 'keyword', val, invokeUpdate),
            },
        },
        projects: {
            close: (v)=> scrum.changeCloseProjects('close', v, invokeUpdate),
            open:  (v)=> scrum.changeCloseProjects('open',  v, invokeUpdate),
        },
        list_pb: {
            cleaAll:  ()=> scrum.setFilterProjects('all-hide', invokeUpdate),
            checkAll: ()=> scrum.setFilterProjects('all-view', invokeUpdate),
        },
        milestone: {
            change: (milestone)=> {
                scrum.fetchIssues(milestone, ()=> invokeUpdate());
            }
        },
    };

    const url_prefix = productbacklog_url_prefix || "/product-backlogs/";

    const base = scrum._data;
    const issues = base.issues;
    const milestone = base.milestone;
    const milestones = base.milestones;

    const data = scrum._projects;

    const projects_filterd = data.projects_filterd;
    const filter = data.filter;

    const sorted_projects_filterd = sogh.sortProjectsByPriority(projects_filterd.list);

    return (
        <div style={style.root}>
          <div style={style.head}>
            <ProductAndMilestone repository={repository}
                                 milestones={milestones}
                                 milestone={milestone}
                                 callbacks={callbacks} />
          </div>

          <div style={style.controller}>
            <div>
              <ButtonRefresh callbacks={callbacks} />
            </div>

            <Filter issues={issues}
                    filter={filter}
                    callbacks={callbacks}
                    sogh={sogh} />
          </div>

          <div style={style.body}>

            <div style={{flexGrow:1}}>
              <div>
                <ChartBardown issues={issues}
                              milestone={milestone} />
              </div>

              <div>
                <OperatorOpenClose callbacks={callbacks.projects} />

                <div style={{display:'flex'}}>
                  <div>
                    <Summary type="projects"
                             source={scrum.summaryProjects(sorted_projects_filterd)}/>
                  </div>

                  <div style={{flexGrow:1}}>
                    <ProductBacklogs projects={sorted_projects_filterd}
                                     close_projects={data.close_projects}
                                     callbacks={callbacks}
                                     sogh={sogh}
                                     productbacklog_url_prefix={props.productbacklog_url_prefix} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
