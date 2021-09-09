import React from 'react';

function styleLabel (type) {
    if (type==='s')
        return {marginBottom:0, fontSize: 12};

    return {marginBottom:0};
}

export default function NextActionDate (props) {
    const issue = props.issue;
    const callback = props.callback;

    const key = 'date_next_action';
    const change = (e) => callback(key, e.target.value);
    const click = () => callback(key, null);

    return (
        <div className="field">

          <label className="label" style={styleLabel(props.type)}>
            Next action date
          </label>

          <div className="control" style={{display:'flex'}}>
            <input className="input is-small"
                   type="date"
                   value={issue[key] || ''}
                   onChange={change} />
            <button className="button is-small"
                    onClick={click}>Clear</button>
          </div>

        </div>
    );
}
