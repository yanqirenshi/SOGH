import React from 'react';

import * as SOGH from './lib/index.js';

export default function PageProductBacklog (props) {
    const token = process.env.REACT_APP_GITHUB_PARSONAL_TOKEN;
    const repository = {
        owner: process.env.REACT_APP_GITHUB_REPOSITORY_OWNER,
        name:  process.env.REACT_APP_GITHUB_REPOSITORY_NAME,
    };

    return (
        <SOGH.ProductBacklog token={token} repository={repository} />
    );
}
