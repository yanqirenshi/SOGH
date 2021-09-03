import React from 'react';

const style = {
    field: { padding: 3, paddingBottom: 0, marginBottom: 0, flexGrow:1 },
    label: { marginBottom: 0, fontSize: 14 },
};

function Field (props) {
    return (
        <div className="field" style={style.field}>
          <label className="label" style={style.label}>
            {props.label}
          </label>
          <div className="control">
            {props.children}
          </div>
        </div>
    );
}

export default function DescriptionFields (props) {
    const data = props.data;
    const callback = props.callback;

    const callCb = (key, val) => {
        const new_data = {...data};
        new_data[key] = val;
        callback(new_data);
    };

    const change = (e) => callCb(e.target.getAttribute('name'), e.target.value);

    const click = (e) => {
        const type = e.target.getAttribute('name');
        const name = e.target.getAttribute('name');

        callCb(name, (type==='date' ? null : ''));
    };

    return (
        <div style={{display:'flex'}}>
          <Field label="$Owner">
            <div style={{display:'flex'}}>
              <input className="input is-small"
                     type="text"
                     placeholder=""
                     name="owner"
                     value={data.owner}
                     onChange={change} />
              <button className="button is-small"
                      name="owner"
                      type="string"
                      onClick={click}>X</button>
            </div>
          </Field>

          <Field label="$Date.Next">
            <div style={{display:'flex'}}>
              <input className="input is-small"
                     type="date"
                     name="next_action_date"
                     value={data.next_action_date}
                     onChange={change} />
              <button className="button is-small"
                      name="next_action_date"
                      type="date"
                      onClick={click}>X</button>
            </div>
          </Field>

          <Field label="$Date.Due">
            <div style={{display:'flex'}}>
              <input className="input is-small"
                     type="date"
                     name="due_date"
                     value={data.due_date}
                     onChange={change} />
              <button className="button is-small"
                      name="due_date"
                      type="date"
                      onClick={click}>X</button>
            </div>
          </Field>
        </div>
    );
}
