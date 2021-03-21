import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './viwer_issues/Contents.js';

function issues (sogh) {
   if (!sogh)
       return [];

    return sogh._data.viwer.issues.pool.list;
}

export default function ViwerIssues (props) {
    const [updated_at, setUpdatedAt] = useState(null);
    const [filter, setFilter] = useState({
        projects:   { ht: {}, list: [] },
        milestones: { ht: {}, list: [] },
    });
    const sogh = props.sogh;
    const repository = props.repository;

    if (sogh) {
        const fetch = sogh._data.viwer.issues.fetch;

        if (!fetch.start && !fetch.end) {
            const viewer = sogh._viewer;

            sogh.getIssuesOpenByRepository(repository, viewer, (issues) => {
                setUpdatedAt(new Date());
                setFilter(sogh.issues2filterContents(issues));
            });
        }
    }

    const callbaks = {
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
            }
        },
    };

    return (
        <>
          {sogh  && <Contents sogh={props.sogh}
                              issues={issues(sogh)}
                              filter={filter}
                              callbaks={callbaks} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
