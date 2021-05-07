import React from 'react';

export default function ANewTab (props) {
    const style = {
        color: 'inherit',
    };
    return (
        <a href={props.to}
           target="_blank"
           rel="noopener noreferrer"
           style={{...style, ...props.style}}>
          {props.children}
        </a>
    );
}
