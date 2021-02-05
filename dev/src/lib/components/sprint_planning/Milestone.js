import React from 'react';

import IssueSummary from './IssueSummary.js';

export default function Milestone (props) {
    const sogh = props.sogh;
    const data = sogh.summaryIssuesByProjects(props.projects);

    const milestone = props.milestone || { title: 'All', url: null };

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

          <div className="panel-block"
               style={{display: 'flex', flexWrap: 'wrap', paddingLeft: 11, fontSize: 12}}>

            <IssueSummary label="Gross" source={data.gross}/>

            {Object.keys(data.assignees).map(key => {
                const d = data.assignees[key];

                return <IssueSummary key={d.assignee.id}
                                     style={{marginLeft:22}}
                                     label={d.assignee.name || d.assignee.login}
                                     source={d}/>;
            })}
          </div>
        </nav>
    );
}
