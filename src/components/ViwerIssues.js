import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Controller from './viwer_issues/Controller.js';
import Contents from './viwer_issues/Contents.js';

export default function ViwerIssues (props) {
    const [gtd, setGtd] = useState(null);
    const [fetched_at, setFetchedAt] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);

    const sogh = props.sogh;

    const repository = props.repository;

    useEffect(() => {
        if (props.sogh)
            setGtd(sogh.gtd());
    }, [props.sogh]);

    useEffect(() => {
            setFetchedAt(new Date());
    }, [gtd]);

    useEffect(() => {
        if (gtd && gtd.isCanFetchData())
            gtd.getIssuesOpenByRepository(repository, gtd.viewer(), (issues) => {
                gtd._filter = gtd.issues2filterContents(gtd._filter, issues);
                setUpdatedAt(new Date());
            });
    }, [fetched_at]);

    const callbaks = {
        refresh: () => setFetchedAt(new Date()),
        filter: {
            change: (id, value) => {
                if (gtd.changeFilter(id, value))
                    setUpdatedAt(new Date());
            },
            changeContents: (type, value) => {
                if (gtd.changeFilterContents(type, value))
                    setUpdatedAt(new Date());
            },
            clearAll: (type) => {
                if (gtd.changeFilterAll(type, false))
                    setUpdatedAt(new Date());
            },
            checkAll: (type) => {
                if (gtd.changeFilterAll(type, true))
                    setUpdatedAt(new Date());
            },
        },
    };

    return (
        <div style={{paddingTop:22}}>

          {gtd && <Controller updated_at={updated_at}
                              filter={gtd._filter}
                              callbaks={callbaks}
                              sogh={props.sogh} />}

          {gtd && <Contents gtd={gtd}
                            issues={gtd._pool.list}
                            filter={gtd._filter}
                            callbaks={callbaks} />}

          {!gtd && <NotSignIn />}
        </div>
    );
}
