import React from 'react';

export default function NextActionDate (props) {
    const issue = props.issue;

    return (
        <div className="field">
          <label className="label">Next action date</label>
          <div className="control" style={{display:'flex'}}>
            <input className="input is-small"
                   type="date"
                   value={issue.date_next_action}
                   onChange={props.callback} />
            <button className="button is-small">Clear</button>
          </div>
        </div>
    );
}
