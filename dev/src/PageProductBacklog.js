import React from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import * as SOGH from './lib/index.js';

function PageProductBacklog (props) {
    const sogh = props.sogh;
    const repository = props.repository;
    const project_id = useParams().id;

    if (!repository)
        return null;

    return (
        <SOGH.ProductBacklog sogh={sogh}
                             repository={repository}
                             project_id={project_id}
                             root_url={{to: '/?tab=pb', label: 'Product Backlogs'}} />
    );
}

export default connect(
    (state) => {
        return {};
    },
    (dispatch) => ({}),
)(PageProductBacklog);
