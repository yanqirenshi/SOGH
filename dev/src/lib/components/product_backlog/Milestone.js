import React from 'react';
import moment from 'moment';

import TablePointProductBacklog from '../common/TablePointProductBacklog.js';

import MilestoneIssuesTable from './MilestoneIssuesTable.js';
import MilestoneIssuesEmpty from './MilestoneIssuesEmpty.js';

export default function Milestone (props) {
    const data = props.source;
    const project = props.project;
    const filter = props.filter;

    const issues = props.source.issues;
    const issues_filterd =  filter.apply(issues);

    const is_empty = issues_filterd.length===0;
    return (
        <nav className="panel">
          <p className="panel-heading" style={{fontSize:14}}>
            {data.title}
          </p>
          <div className="panel-block">
            {is_empty && <MilestoneIssuesEmpty />}
            {!is_empty &&
             <MilestoneIssuesTable project={props.project}
                                   issues={issues_filterd} />}
          </div>

          <div className="panel-block">
            <TablePointProductBacklog issues={issues || []} />
          </div>
        </nav>
    );
}
