import React from 'react';

const style = {
    paddingLeft:11,
    paddingRight: 11,
};

export default function Field (props) {
    return (
          <div className="field" style={style}>
            <label className="label" style={{marginBottom:0}}>
              {props.label}
            </label>
            <div className="control" style={props.style}>
              {props.children}
            </div>
          </div>
    );
}
