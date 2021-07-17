import React from 'react';

export default function Sections (props) {
    const style = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    };

    return (
        <div style={style}>
          {props.children}
        </div>
    );
}
