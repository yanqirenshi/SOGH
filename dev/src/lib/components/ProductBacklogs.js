import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './product_backlogs/Contents.js';

export default function ProductBacklogs (props) {
    const [core, setCore] = useState(null);
    const [projects, setProjects] = useState([]);

    const sogh = props.sogh;
    const repository = props.repository;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    useEffect(() => {
        if (!sogh) return;

        setCore(sogh.productBacklogs());
    }, [sogh]);

    useEffect(() => {
        if (!repository) return;

        sogh.getProjectsByRepository(repository, (projects) => {
            setProjects(projects);
        });

    }, [repository]);

    const callbacks = {
        refresh: () => {
            setProjects([]);

            sogh.getProjectsByRepository(repository, (projects) => {
                console.log(projects);
                setProjects(projects);
            });
        },
    };

    const url_prefix = productbacklog_url_prefix || "/product-backlogs/";

    return (
        <>
          {core  && <Contents sogh={sogh}
                              core={core}
                              projects={projects}
                              repository={repository}
                              callbacks={callbacks}
                              productbacklog_url_prefix={url_prefix} />}
          {!core && <NotSignIn />}
        </>
    );
}
