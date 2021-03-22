import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Controller from './viwer_issues/Controller.js';
import Contents from './viwer_issues/Contents.js';

function allOpenClose (filter, type, v) {
    if (!filter[type])
        return filter;

    for (const d of filter[type].list)
        d.active = v;

    return {...filter};
}

export default function ViwerIssues (props) {
    const [gtd, setGtd] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);
    const [filter, setFilter] = useState({
        projects:   { ht: {}, list: [] },
        milestones: { ht: {}, list: [] },
        contents: {
            word: '',
            targets: { labels: true, title: false } ,
        },
    });

    const sogh = props.sogh;

    const repository = props.repository;

    useEffect(() => {
        if (props.sogh)
            setGtd(sogh.gtd());
    }, [props.sogh]);

    useEffect(() => {
        if (!gtd || !gtd.isNeedFetchData())
            return;

        gtd.getIssuesOpenByRepository(repository, gtd.viewer(), (issues) => {
            setFilter(gtd.issues2filterContents(filter, issues));
        });
    }, [gtd]);

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
            changeContents: (type, value) => {
                if ('word'===type) {
                    if (filter.contents.word===value)
                        return;
                    filter.contents.word = value;
                }

                if ('labels'===type) {
                    if (filter.contents.targets.labels===value)
                        return;
                    filter.contents.targets.labels = value;
                }

                if ('title'===type) {
                    if (filter.contents.targets.title===value)
                        return;
                    filter.contents.targets.title = value;
                }

                setFilter({...filter});
            },
            clearAll: (type) => setFilter(allOpenClose(filter, type, false)),
            checkAll: (type) => setFilter(allOpenClose(filter, type, true)),
        },
    };

    return (
        <div style={{paddingTop:22}}>
          {gtd && <Controller updated_at={updated_at}
                        filter={filter}
                        callbaks={callbaks}
                        sogh={props.sogh} />}
          {gtd && <Contents gtd={gtd}
                              issues={gtd._pool.list}
                              filter={filter}
                              callbaks={callbaks} />}
          {!gtd && <NotSignIn />}
        </div>
    );
}
