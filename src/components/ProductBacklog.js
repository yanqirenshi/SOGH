import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './product_backlog/Contents.js';

export default function ProductBacklog (props) {
    const [core, setCore] = useState(null);

    useEffect(() => {
        if (!props.sogh) return;

        setCore(props.sogh.productBacklog());
    }, [props.sogh]);

    const sogh = props.sogh;

    return (
        <>
          {core  && <Contents core={core} sogh={sogh}
                              repository={props.repository}
                              project_id={props.project_id}
                              root_url={props.root_url} />}
          {!core && <NotSignIn />}
        </>
    );
}
