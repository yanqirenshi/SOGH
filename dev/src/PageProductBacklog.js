import React from 'react';

import Sogh, * as SOGH from './lib/index.js';

export default function PageProductBacklog (props) {
    const repository = {
        owner: process.env.REACT_APP_GITHUB_REPOSITORY_OWNER,
        name:  process.env.REACT_APP_GITHUB_REPOSITORY_NAME,
    };

    const sogh = new Sogh(process.env.REACT_APP_GITHUB_PARSONAL_TOKEN);

    return (
        <SOGH.ProductBacklog sogh={sogh}
                             repository={repository}
                             project_id={props.match.params.id}
                             root_url={{to: '/?tab=pb', label: 'Product Backlogs'}} />
    );
}
