import React from 'react';

import IssueSummary from './IssueSummary.js';
import MilestonePriorityTable from './MilestonePriorityTable.js';

export default function Milestone (props) {
    const sogh = props.sogh;
    const data = sogh.summaryIssuesByProjects(props.projects);
    const milestone = props.milestone || { title: 'All', url: null };
    const priorities = [
        { code: 'c', label: '緊急' },
        { code: 'h', label: '高' },
        { code: 'n', label: '普' },
        { code: 'l', label: '低' },
    ];

    return (
        <nav className="panel">
          <p className="panel-heading"
             style={{fontSize:14}}>
            Milestone:

            <strong style={{marginLeft:8}}>
              {milestone.title}
            </strong>

            {milestone.url &&
             <span style={{marginLeft: 11}}>
               (
               <a href={milestone.url}>
                 {milestone.number}
               </a>
               )
             </span>}
          </p>

          <div className="panel-block">
            <div style={{display: 'flex', alignItems: 'flex-start'}}>

              <div>
                <MilestonePriorityTable data={data}/>
              </div>

              <div style={{display: 'flex', flexWrap: 'wrap', paddingLeft: 22, fontSize: 12}}>
                <IssueSummary label="Gross" source={data.gross} style={{marginRight:22}} />

                {Object.keys(data.assignees).map(key => {
                    const d = data.assignees[key];

                    return <IssueSummary key={d.assignee.id}
                              style={{marginRight:22}}
                              label={d.assignee.name || d.assignee.login}
                              source={d}/>;
                })}
              </div>

            </div>
          </div>
        </nav>
    );
}
