import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './product_backlogs/Contents.js';

export default function ProductBacklogs (props) {
    const [productbacklogs, setProductBacklogs] = useState(null);
    const [projects, setProjects] = useState([]);
    const sogh = props.sogh;

    useEffect(() => {
        if (!sogh) return;

        setProductBacklogs(sogh.productBacklogs());
    }, [sogh]);

    useEffect(() => {
        if (!productbacklogs) return;

        productbacklogs.getProjectsByRepository(props.repository, (projects) => {
            setProjects(projects);
        });

    }, [productbacklogs]);

    const callbacks = {
        refresh: () => {
            setProjects([]);

            productbacklogs.getProjectsByRepository(props.repository, (projects) => {
                setProjects(projects);
            });
        },
    };

    const url_prefix = props.productbacklog_url_prefix || "/product-backlogs/";

    return (
        <>
          {productbacklogs  && <Contents sogh={sogh}
                                         productbacklogs={productbacklogs}
                                         projects={projects}
                                         repository={props.repository}
                                         callbacks={callbacks}
                                         productbacklog_url_prefix={url_prefix} />}
          {!productbacklogs && <NotSignIn />}
        </>
    );
}
