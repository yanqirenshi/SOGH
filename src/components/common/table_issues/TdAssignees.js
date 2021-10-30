import React from 'react';

export default function TdAssignees (props) {
    const issue = props.issue;

    return (
        <td>
          {issue.assignees().map(a => {
              return (
                  <p key={issue.id() + '.' + a.id}
                     style={{whiteSpace: 'nowrap'}}>
                    {a.name || a.login}
                  </p>
              );
          })}
        </td>
    );
}
