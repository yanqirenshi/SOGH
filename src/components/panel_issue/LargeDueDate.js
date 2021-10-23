import React from 'react';

export default function LargeDueDate (props) {
    const issue = props.issue;
    const callback = props.callback;

    const key = 'due_date';
    const change = (e) => callback(key, e.target.value);
    const click = () => callback(key, null);

    return (
        <div className="field">
          <label className="label" style={{marginBottom:0}}>
            Due date
          </label>
          <div className="control" style={{display:'flex'}}>
            <input className="input is-small"
                   type="date"
                   value={issue.dueDate() || ''}
                   onChange={change} />
            <button className="button is-small"
                    onClick={click}>
              Clear
            </button>
          </div>
        </div>
    );
}
