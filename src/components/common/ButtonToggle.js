import React from 'react';

export default function ButtonToggle (props) {
    const clickButton = (e) => {
        props.callback(e.target.getAttribute('code'));
    };

    const style = {
        height: 40,
        padding: '7px 22px 11px 22px',
        marginRight: 22
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
