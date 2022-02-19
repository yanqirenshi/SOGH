import React from 'react';

const style = {
    padding: 3,
    paddingBottom: 0,
    marginBottom: 0,
    flexGrow:1,
    label: {
        marginBottom: 0,
        fontSize: 14
    },
};

export default function Field (props) {
    return (
        <div className="field" style={style}>
          <label className="label" style={style.label}>
            {props.label}
          </label>
          <div className="control">
            {props.children}
          </div>
        </div>
    );
}
