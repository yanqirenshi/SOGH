import React from 'react';

import Field from './Field.js';
import ANewTab from './ANewTab.js';

function getProjectColumn (issue) {
    const project_card = issue.projectCards.nodes[0];

    if (!project_card)
        return null;

    return project_card.column;
}

const style = {
    fontSize:14,
    marginTop:8,
    display: 'flex',
    alignItems: 'center',
    button: {
        marginLeft: 11,
    },
};

export default function LargeProject (props) {
    const issue = props.issue;

    const column = getProjectColumn(issue);

    return (
        <div>
          <Field label="Project" style={{display:'flex'}}>
            {column && (
                <p>
                  {column.project.name}
                  <span style={{marginLeft:11}}>(</span>
                  <ANewTab href={column.project.url}>
                    {column.project.number}
                  </ANewTab>
                  <span>)</span>
                </p>
            )}
            {!column && (
                <div style={{fontSize:12, marginTop:8, color: '#f00'}}>
                  <p>Project なし</p>
                </div>
            )}
            <button className="button is-small"
                    style={style.button} disabled>
              Change
            </button>
          </Field>
        </div>
    );
}
