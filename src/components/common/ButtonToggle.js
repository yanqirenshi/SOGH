import React from 'react';

export default function ButtonToggle (props) {
    const clickButton = (e) => {
        props.callback(e.target.getAttribute('code'));
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
        },
        ...props.style || {},
    };

    const selected = props.on;

    return (
        <button className={ "button is-small " + (selected ? '' : 'is-info')}
                key={props.code}
                code={props.code}
                style={style}
                onClick={clickButton}>
          {props.label}
        </button>
    );
}
