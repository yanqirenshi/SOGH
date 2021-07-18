import React from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './sprint_planning/Contents.js';

export default function SprintPlanning (props) {
    const sogh = props.sogh;
    const repository = props.repository;

    return (
        <>
          {sogh  && <Contents sogh={sogh} repository={repository} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
