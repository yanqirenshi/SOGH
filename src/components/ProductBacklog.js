import React from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './product_backlog/Contents.js';

export default function ProductBacklog (props) {
    const sogh = props.sogh;

    return (
        <>
          {sogh  && <Contents sogh={props.sogh}
                              repository={props.repository}
                              project_id={props.project_id} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
