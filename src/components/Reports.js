import React from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './reports/Contents.js';

export default function Reports (props) {
    const sogh = props.sogh;

    return (
        <>
          {sogh  && <Contents sogh={props.sogh} repository={props.repository} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
