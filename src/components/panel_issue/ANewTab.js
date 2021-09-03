import React from 'react';

export default function ANewTab (props) {
    const style = {
        color: 'inherit',
        textDecoration: 'underline dotted rgb(201, 201, 201)',
        textUnderlineOffset: 3,
    };
    return (
        <a href={props.to || props.href}
           target="_blank"
           rel="noopener noreferrer"
           style={{...style, ...props.style}}>
          {props.children}
        </a>
    );
}
