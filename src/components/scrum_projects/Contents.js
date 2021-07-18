import React from 'react';

import ButtonRefresh       from '../common/ButtonRefresh.js';
import ProductBacklogs     from '../common/ProductBacklogs.js';
import ProductAndMilestone from '../common/ProductAndMilestone.js';
import Filter              from '../common/Filter.js';
import ChartBardown        from '../common/ChartBardown.js';
import OperatorOpenClose   from '../common/OperatorOpenClose.js';
import Summary             from '../common/Summary.js';

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

export default function Contents (props) {
    const scrum = props.scrum;
    const sogh = scrum._sogh;

    const repository = props.repository;
    const callbacks = props.callbacks;

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
