import React from 'react';
import moment from 'moment';

import {Button} from 'react-bulma-components';
import TableReportTrOpen from './TableReportTrOpen.js';

function dt (v) {
    if (!v) return '';

    return moment(v).format('YYYY-MM-DD') ;
}

function project (issue) {
    if (issue.projectCards.nodes.length===0)
        return '--';

    const project = issue.projectCards.nodes[0].column.project;

    return project.name;
}

export default function TableReportTr (props) {
    const sogh = props.sogh;

    const clickSwitch = (e) => {
        props.callbacks.switch(e.target.getAttribute('issue_id'));
    };

    const issue = props.issue;
    return (
        <>
          {props.open &&
           <tr key={issue.id}>
             <td>{dt(issue.updatedAt)}</td>
             <td>
               <a href={issue.url}>
                 {issue.number}
               </a>
             </td>
             <td>
               <Button issue_id={issue.id}
                       onClick={clickSwitch}>
                 {issue.title}
               </Button>
             </td>
             <td>
               <TableReportTrOpen issue={issue}
                                  callbacks={props.callbacks}/>
             </td>
           </tr>}

          {!props.open &&
           <tr key={issue.id}>
             <td>{dt(issue.updatedAt)}</td>
             <td>
               <a href={issue.url}>
                 {issue.number}
               </a>
             </td>
             <td>
               <Button issue_id={issue.id}
                       onClick={clickSwitch}>
                 {issue.title}
               </Button>
             </td>
             <td>{project(issue)}</td>
           </tr>}
        </>
    );
}
