import React from 'react';

const style = {
    normal: {
        color: 'inherit',
        textDecoration: 'underline',
        textUnderlineOffset: 2,
        textDecorationColor: '#ddd',
        textDecorationStyle: 'dotted',
    },
};

export function LinkBlank (props) {
    const style_root = {...style.normal, ...(props.style || {})};

    return (
        <a style={style_root}
           href={props.href}
           target="_blank"
           rel="noopener noreferrer">
          {props.label || props.children || props.href}
        </a>
    );
}
