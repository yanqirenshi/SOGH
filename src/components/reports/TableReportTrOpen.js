import React from 'react';
import moment from 'moment';

function dt (v) {
    if (!v) return '';

    return moment(v).format('YYYY-MM-DD HH:mm:ss') ;
}

function project (issue) {
    if (issue.projectCards.nodes.length===0)
        return '--';

    const project = issue.projectCards.nodes[0].column.project;

    return project.name;
}

export default function TableReportTrOpen (props) {
    const issue = props.issue;
    return (
        <div style={{marginBottom:33}}>
          <table className="table is-bordered is-narrow is-hoverable is-fullwidth"
                 style={{fontSize:14}}>
            <tbody>
              <tr><th>Product Backlog</th></tr>
              <tr><td>{project(issue)}</td></tr>
              <tr><th>更新</th></tr>
              <tr><td>{dt(issue.updatedAt)}</td></tr>
              <tr><th>内容</th></tr>
              <tr><td><div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} /></td></tr>
            </tbody>
          </table>
        </div>
    );
}
