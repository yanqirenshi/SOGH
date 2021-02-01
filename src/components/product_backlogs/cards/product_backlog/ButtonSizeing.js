import React from 'react';

const s = {
    root: {
        background: '#bbbbbb',
        color: '#fff',
        width: 22,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        fontSize: 12,
    }
}

export default function ButtonSizeing (props) {
    const style = props.sogh.sizingButtonColors(props.priority);

    return (
        <div onClick={props.onClick}
             style={{...s.root, ...style, ...(props.style||{})}}>
          {props.label}
        </div>
    );
}
