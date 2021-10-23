import React from 'react';

import ANewTab from './ANewTab.js';

const style = {
    fontSize:12,
    marginTop:8
};

export default function SmallProjectName (props) {
    const issue = props.issue;

    const column = issue.getColumnFirst();

    if (!column)
        return null;

    return (
        <div style={style}>
          <p>
            {column.project.name}

            <span style={{marginLeft:11}}>(</span>
            <ANewTab href={column.project.url}>
              {column.project.number}
            </ANewTab>
            <span>)</span>
          </p>
        </div>
    );
}
