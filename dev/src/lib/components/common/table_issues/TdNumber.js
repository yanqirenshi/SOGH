import React from 'react';

export default function TdNumber (props) {
    const issue = props.issue;

    return (
        <td>
          <a href={issue.url()} target="_blank" rel="noreferrer">
            {issue.number()}
          </a>
        </td>
    );
}
