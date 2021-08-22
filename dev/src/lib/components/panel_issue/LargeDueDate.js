import React from 'react';

export default function LargeDueDate (props) {
    const issue = props.issue;

    return (
        <div className="field">
          <label className="label">Due date</label>
          <div className="control" style={{display:'flex'}}>
            <input className="input is-small"
                   type="date"
                   value={issue.due_date}
                   onChange={props.callback} />
            <button className="button is-small">Clear</button>
          </div>
        </div>
    );
}
