import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './sprint_planning/Contents.js';

export default function SprintPlanning (props) {
    const [repository, setRepository] = useState(null);

    const sogh = props.sogh;

    useEffect(() => {
        if (!props.repository) return;
        setRepository(props.repository);
    }, [props.repository]);

    return (
        <>
          {sogh  && repository && <Contents sogh={sogh} repository={repository} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
