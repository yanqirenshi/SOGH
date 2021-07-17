import React from 'react';

import {Link as ReactRouterLink} from "react-router-dom";

export default function Link (props) {
    return (
        <ReactRouterLink to={props.to}>
          {props.children}
        </ReactRouterLink>
    );
}
