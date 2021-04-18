import React from 'react';

const drawTh = (c) => {
    return (
        <th key={c.id}>
          {c.name}
        </th>
    );
};
const drawTd = (column, assignee) => {
    const column_id =column.id;
    const issues = assignee.columns[column_id];

    return (
        <td key={column_id}>
          {issues ? issues.length : 0}
        </td>
    );
}
const drawTr = (assignee, column_list) => {
    return (
        <tr key={assignee.id}>
          <td>{assignee.name || assignee.login}</td>

          {column_list.map(column => drawTd(column, assignee))}
        </tr>
    );
};
export default function TableIssueCountParsonColumn (props) {
    const columns = props.columns;
    const assignees = props.assignees;

    const columns_list = props.core.sortColumns(columns.list);

    return (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th rowSpan="2">Assignee</th>
              {columns_list.map(c => drawTh(c))}
            </tr>
          </thead>
          <tbody>
            {assignees.list.map(assignee => drawTr(assignee, columns_list))}
          </tbody>
        </table>
    );
}
