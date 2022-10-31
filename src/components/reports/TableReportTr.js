import React from 'react';
import moment from 'moment';

import TableReportTrOpen from './TableReportTrOpen.js';

function dt (v) {
    if (!v) return '';

    return moment(v).format('YYYY-MM-DD') ;
}

function project (issue) {
    if (issue.projectCards().length===0)
        return '--';

    const project = issue.projectCards()[0].column.project;

    return project.name;
}

export default function TableReportTr (props) {
    const clickSwitch = (e) => {
        props.callbacks.switch(e.target.getAttribute('issue_id'));
    };

    const issue = props.issue;

    return (
        <>
          {props.open &&
           <tr key={issue.id}>
             <td style={{whiteSpace: 'nowrap'}}>
               {dt(issue.updatedAt())}
             </td>
             <td>
               <a href={issue.url()}>
                 {issue.number()}
               </a>
             </td>
             <td>
               <button className="button is-fullwidth"
                       style={{
                           whiteSpace: 'break-spaces',
                           textAlign: 'left',
                       }}
                       issue_id={issue.id()}
                       onClick={clickSwitch}>
                 {issue.title()}
               </button>
             </td>
             <td>
               <TableReportTrOpen issue={issue}
                                  callbacks={props.callbacks}/>
             </td>
           </tr>}

          {!props.open &&
           <tr key={issue.id()}>
             <td>{dt(issue.updatedAt())}</td>
             <td>
               <a href={issue.url()}>
                 {issue.number()}
               </a>
             </td>
             <td>
               {issue.closedAt ? 'Close' : 'Open'}
             </td>
             <td>
               <button className="button"
                       issue_id={issue.id()}
                       onClick={clickSwitch}>
                 {issue.title()}
               </button>
             </td>
             <td>{project(issue)}</td>
           </tr>}
        </>
    );
}
