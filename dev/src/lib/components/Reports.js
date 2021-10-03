import React from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './reports/Contents.js';

export default function Reports (props) {
    const sogh = props.sogh;
    const repository = props.repository;

    return (
        <>
          {sogh  && repository && <Contents sogh={sogh} repository={repository} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
