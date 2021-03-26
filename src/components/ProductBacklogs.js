import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './product_backlogs/Contents.js';

export default function ProductBacklogs (props) {
    const [product_backlogs, setProductBacklogs] = useState(null);
    const sogh = props.sogh;

    useEffect(() => {
        if (props.sogh) return;

        setProductBacklogs(props.sogh.productBacklogs());
    }, [props.sogh]);

    console.log('-----------------------------')

    useEffect(() => {
        console.log('a-')
        if (!product_backlogs) return;

        console.log('b-')
        product_backlogs.getProjectsByRepository(props.repository, (projects) => {
        console.log('c-')
            console.log(projects);
        });


    }, [product_backlogs]);

    const url_prefix = props.productbacklog_url_prefix || "/product-backlogs/";

    return (
        <>
          {product_backlogs  && <Contents sogh={props.sogh}
                                          product_backlogs={product_backlogs}
                                          repository={props.repository}
                                          productbacklog_url_prefix={url_prefix} />}
          {!product_backlogs && <NotSignIn />}
        </>
    );
}
