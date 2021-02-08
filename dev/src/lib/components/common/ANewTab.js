import React from 'react';

export default function ANewTab (props) {
    return (
        <a href={props.to}
           target="_blank"
           rel="noopener noreferrer"
           style={props.style}>
          {props.children}
        </a>
    );
}
