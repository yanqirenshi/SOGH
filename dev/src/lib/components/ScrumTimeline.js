import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './scrum_timeline/Contents.js';

export default function ScrumTimeline (props) {
    const [scrum, setScrum] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);

    const repository = props.repository;

    const refresh = () => scrum.fetch(repository, () => setUpdatedAt(new Date()));

    useEffect(() => {
        if (props.sogh) setScrum(props.sogh.scrum());
    }, [props.sogh]);

    useEffect(() => {
        if (!scrum || !scrum.isNeverFetched())
            return;

        refresh();
    }, [scrum]);

    const changeFilter = (type, id) => {
        scrum.changeFilter('timeline', type, id, () => {
            setUpdatedAt(new Date());
        });
    };

    const callbacks = {
        refresh: () => refresh(),
        filter: {
            click: (type, id) => changeFilter(type, id),
        },
    };

    return (
        <>
          <span style={{display:'none'}}>{!!updated_at}</span>
          {scrum  && <Contents scrum={scrum}
                               callbacks={callbacks}
                               repository={repository} />}
          {!scrum && <NotSignIn />}
        </>
    );
}
