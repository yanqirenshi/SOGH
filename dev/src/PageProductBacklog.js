import React from 'react';
import { connect } from 'react-redux';

import * as SOGH from './lib/index.js';

function PageProductBacklog (props) {
    const repository = {
        owner: process.env.REACT_APP_GITHUB_REPOSITORY_OWNER,
        name:  process.env.REACT_APP_GITHUB_REPOSITORY_NAME,
    };

    const sogh = props.sogh;

    return (
        <SOGH.ProductBacklog sogh={sogh}
                             repository={repository}
                             project_id={props.match.params.id}
                             root_url={{to: '/?tab=pb', label: 'Product Backlogs'}} />
    );
}

export default connect(
    (state) => {
        return {
            sogh: state.sogh,
        };
    },
    (dispatch) => ({}),
)(PageProductBacklog);
