import React from 'react';
import moment from 'moment';

import {Table, Button, Heading} from 'react-bulma-components';

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
    const sogh = props.sogh;

    const clickSwitch = (e) => {
        props.callbacks.switch(e.target.getAttribute('issue_id'));
    };

    const issue = props.issue;
    return (
        <div style={{marginBottom:33}}>
          <Table bordered={true} striped={false}>
            <tbody>
              <tr><th>Product Backlog</th></tr>
              <tr><td>{project(issue)}</td></tr>
              <tr><th>更新</th></tr>
              <tr><td>{dt(issue.updatedAt)}</td></tr>
              <tr><th>内容</th></tr>
              <tr><td><div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} /></td></tr>
            </tbody>
          </Table>
        </div>
    );
}
