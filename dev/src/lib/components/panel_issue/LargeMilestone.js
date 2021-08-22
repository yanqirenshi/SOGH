import React from 'react';

import Field from './Field.js';
import ANewTab from './ANewTab.js';

const style = {
    fontSize:14,
    marginTop:8,
    display: 'flex',
    alignItems: 'center',
    button: {
        marginLeft: 11,
    },
};

export default function LargeMilestone (props) {
    const issue = props.issue;

    const milestone = issue.milestone;

    return (
        <div>
          <Field label="Milestone" style={{display:'flex'}}>
            <p>
              <ANewTab href={milestone.url}>
                {milestone.title}
              </ANewTab>
            </p>

            <button className="button is-small"
                    style={style.button}>
              Change
            </button>
          </Field>
        </div>
    );
}
