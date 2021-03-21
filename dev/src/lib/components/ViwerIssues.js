import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Controller from './viwer_issues/Controller.js';
import Contents from './viwer_issues/Contents.js';

function issues (sogh) {
    return !sogh ? [] : sogh._data.viwer.issues.pool.list;
}

function allOpenClose (filter, type, v) {
    if (!filter[type])
        return filter;

    for (const d of filter[type].list)
        d.active = v;

    return {...filter};
}

export default function ViwerIssues (props) {
    const [updated_at, setUpdatedAt] = useState(null);
    const [filter, setFilter] = useState({
        projects:   { ht: {}, list: [] },
        milestones: { ht: {}, list: [] },
    });
    const sogh = props.sogh;
    const repository = props.repository;

    useEffect(() => {
        if (!props.sogh)
            return;

        if (!fetch.start && !fetch.end)
            setUpdatedAt(new Date());
    }, [props.sogh]);

    useEffect(() => {
        if (!updated_at)
            return;

        sogh.getIssuesOpenByRepository(repository, sogh._viewer, (issues) => {
            setFilter(sogh.issues2filterContents(issues));
        });
    }, [updated_at]);

    const callbaks = {
        refresh: () => setUpdatedAt(new Date()),
        filter: {
            change: (id, value) => {
                const project = filter.projects.ht[id];
                const milestones = filter.milestones.ht[id];

                if (!project && !milestones)
                    return;

                if (filter.projects.ht[id])
                    filter.projects.ht[id].active = value;

                if (filter.milestones.ht[id])
                    filter.milestones.ht[id].active = value;

                setFilter({...filter});
            },
            clearAll: (type) => setFilter(allOpenClose(filter, type, false)),
            checkAll: (type) => setFilter(allOpenClose(filter, type, true)),
        },
    };

    return (
        <div style={{paddingTop:22}}>
          {sogh  && <Controller updated_at={updated_at}
                                callbaks={callbaks}
                                sogh={props.sogh} />}
          {sogh  && <Contents sogh={props.sogh}
                              issues={issues(sogh)}
                              filter={filter}
                              callbaks={callbaks} />}
          {!sogh && <NotSignIn />}
        </div>
    );
}
