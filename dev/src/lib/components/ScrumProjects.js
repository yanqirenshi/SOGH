import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './scrum_projects/Contents.js';

export default function ScrumProjects (props) {
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

    const invokeUpdate = () => setUpdatedAt(new Date());

    const callbacks = {
        refresh: () => refresh(),
        filter: {
            click: (type, id) => scrum.changeFilter('projects', type, id, invokeUpdate),
        },
        projects: {
            close: (v) => scrum.changeCloseProjects('close', v, invokeUpdate),
            open:  (v) => scrum.changeCloseProjects('open',  v, invokeUpdate),
        },
        list_pb: {
            cleaAll:  () => scrum.setFilterProjects('all-hide', invokeUpdate),
            checkAll: () => scrum.setFilterProjects('all-view', invokeUpdate),
        }
    };
    return (
        <>
          <span style={{display:'none'}}>{!!updated_at}</span>
          {scrum  && <Contents scrum={scrum}
                               callbacks={callbacks}
                               repository={props.repository} />}
          {!scrum && <NotSignIn />}
        </>
    );
}
