import React from 'react';

import {Table} from 'react-bulma-components';

import TableReportTr from './TableReportTr.js';

export default function TableReports (props) {
    const sogh = props.sogh;

    const clickSwitch = (e) => {
        props.callbacks.switch(e.target.getAttribute('issue_id'));
    };

    const issues = props.issues;
    const opens = props.opens;
    return (
         <Table>
           <thead>
             <tr>
               <th>更新</th>
               <th>#</th>
               <th>Title</th>
               <th>Project / Contents</th>
             </tr>
           </thead>

           <tbody>
             {issues.map(d =>
                         <TableReportTr key={d.id}
                                        issue={d}
                                        open={opens[d.id]}
                                        callbacks={props.callbacks}
                                        sogh={props.sogh} />)}
           </tbody>
         </Table>
    );
}
