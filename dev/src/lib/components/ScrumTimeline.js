import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './scrum_timeline/Contents.js';

export default function ScrumTimeline (props) {
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
        if (!scrum) return;

        scrum.addListeners(() => invokeUpdate());

        if (scrum.isNeverFetched())
            refresh();
    }, [scrum]);

    const changeFilter = (type, id) => {
        scrum.changeFilter('timeline', type, id, () => invokeUpdate());
    };

    const callbacks = {
        refresh: () => refresh(),
        filter: {
            click: (type, id) => changeFilter(type, id),
            keyword: {
                change: (val) => changeFilter('keyword', val),
            },
        },
        milestone: {
            change: (milestone) => {
                scrum.fetchIssues(milestone, () => setUpdatedAt(new Date()));
            }
        },
        duedate: {
            close: (v) => scrum.changeCloseDueDates('close', v, invokeUpdate),
            open:  (v) => scrum.changeCloseDueDates('open',  v, invokeUpdate),
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
