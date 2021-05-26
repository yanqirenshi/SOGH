import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './scrum_projects/Contents.js';

export default function ScrumProjects (props) {
    const [scrum, setScrum] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);

    const repository = props.repository;

    const invokeUpdate = () => setUpdatedAt(new Date());
    const refresh = () => scrum.fetch(repository, () => invokeUpdate());

    useEffect(() => {
        if (props.sogh)
            setScrum(props.sogh.scrum());
    }, [props.sogh]);

    useEffect(() => {
        if (!scrum)
            return;

        scrum.addListeners(() => invokeUpdate());

        if (scrum.isNeverFetched())
            refresh();
    }, [scrum]);

    const callbacks = {
        refresh: () => refresh(),
        filter: {
            click: (type, id) => scrum.changeFilter('projects', type, id, invokeUpdate),
            keyword: {
                change: (val) => scrum.changeFilter('projects', 'keyword', val, invokeUpdate),
            },
        },
        projects: {
            close: (v) => scrum.changeCloseProjects('close', v, invokeUpdate),
            open:  (v) => scrum.changeCloseProjects('open',  v, invokeUpdate),
        },
        list_pb: {
            cleaAll:  () => scrum.setFilterProjects('all-hide', invokeUpdate),
            checkAll: () => scrum.setFilterProjects('all-view', invokeUpdate),
        },
        milestone: {
            change: (milestone) => {
                scrum.fetchIssues(milestone, () => setUpdatedAt(new Date()));
            }
        },
    };

    const url_prefix = props.productbacklog_url_prefix || "/product-backlogs/";

    return (
        <>
          <span style={{display:'none'}}>{!!updated_at}</span>
          {scrum  && <Contents scrum={scrum}
                               callbacks={callbacks}
                               repository={repository}
                               productbacklog_url_prefix={url_prefix} />}
          {!scrum && <NotSignIn />}
        </>
    );
}
