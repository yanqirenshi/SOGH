import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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

export function LinkBlankGithub (props) {
    return (
        <LinkBlank href={props.href}>
          <FontAwesomeIcon style={null} icon={faGithub} />
        </LinkBlank>
    );
}
