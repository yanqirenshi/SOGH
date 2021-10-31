import React from 'react';

export default function ButtonToggle (props) {
    const code = props.code;
    const label = props.label;
    const selected = props.on;
    const callback = props.callback;

    const clickButton = (e) => {
        callback(e.target.getAttribute('code'));
    };

    const style = {
        ...{
            height: 30,
            fontSize: 14,
            marginRight: 11,
            paddingLeft: 11,
            paddingRight: 11,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: selected ? null : 'rgb(0, 136, 0)',
            color: selected ? null : '#fff',
            border: 'none',
        },
        ...props.style || {},
    };

    return (
        <button className={ "button is-small"}
                key={code}
                code={code}
                style={style}
                onClick={clickButton}>
          {label}
        </button>
    );
}
