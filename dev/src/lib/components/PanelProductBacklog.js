import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

export default function PanelProductBacklog (props) {
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
          {!core && <NotSignIn />}
        </>
    );
}
