import React from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './daily_scrum/Contents.js';

export default function DailyScrum (props) {
    const sogh = props.sogh;

    return (
        <>
          {sogh  && <Contents sogh={props.sogh} repository={props.repository} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
