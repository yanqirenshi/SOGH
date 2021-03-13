import React from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './sprint_planning/Contents.js';

export default function SprintPlanning (props) {
    const sogh = props.sogh;

    return (
        <>
          {sogh  && <Contents sogh={props.sogh} repository={props.repository} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
