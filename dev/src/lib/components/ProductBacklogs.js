import React from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './product_backlogs/Contents.js';

export default function ProductBacklogs (props) {
    const sogh = props.sogh;

    return (
        <>
          {sogh  && <Contents sogh={props.sogh}
                              repository={props.repository}
                              productbacklog_url_prefix="/product-backlogs/" />}
          {!sogh && <NotSignIn />}
        </>
    );
}
