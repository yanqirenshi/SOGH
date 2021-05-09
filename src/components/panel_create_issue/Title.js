import React from 'react';

const style = {
    width: '100%',
    height: '100%',
};

export default function Title (props) {
    const callback = props.callbacks.change.title;
    const change = (e) => callback(e.target.value);

    return (
        <div style={style}>
          <input className="input"
                 type="text"
                 onKeyUp={change}/>
        </div>
    );
}
