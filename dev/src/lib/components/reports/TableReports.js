import React from 'react';

import TableReportTr from './TableReportTr.js';

export default function TableReports (props) {
    const sogh = props.sogh;

    const issues = props.issues;
    const opens = props.opens;
    return (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
           <thead>
             <tr>
               <th>更新</th>
               <th>#</th>
               <th>Status</th>
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
                                        sogh={sogh} />)}
           </tbody>
        </table>
    );
}
