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

    if (props.on) {
        style.border = '1px solid #eeeeee';
        style.boxShadow = 'none';
    }

    return (
        <div key={props.code}
             code={props.code}
             className="card"
             style={style}
             onClick={clickButton}>
          {props.label}
        </div>
    );
}
