import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './product_backlog/Contents.js';

export default function ProductBacklog (props) {
    const [core, setCore] = useState(null);

    const sogh = props.sogh;
    const repository = props.repository;
    const project_id = props.project_id;
    const root_url   = props.root_url;

    useEffect(() => {
        if (!sogh) return;

        setCore(sogh.productBacklog());
    }, [sogh]);

    return (
        <>
          {core  && <Contents core={core} sogh={sogh}
                              repository={repository}
                              project_id={project_id}
                              root_url={root_url} />}
          {!core && <NotSignIn />}
        </>
    );
}
