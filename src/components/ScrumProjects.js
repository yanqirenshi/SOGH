import React from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './scrum_projects/Contents.js';

export default function ScrumProjects (props) {
    const sogh = props.sogh;

    return (
        <>
          {sogh  && <Contents sogh={props.sogh} repository={props.repository} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
