import React, { useState } from 'react';

import {Issue} from '../js/models/index.js';

import Large from './panel_issue/Large.js';
import Small from './panel_issue/Small.js';

export default function PanelIssue (props) {
    const [updated_at, setUpdatedAt] = useState(new Date());

    const issue = props.issue;
    const sogh = props.sogh;
    const size = props.size;
    const callback = props.callback;

    const style = {
        width: props.w || 200,
    };
    const change = (key, val) => {
        const i = issue;

        if (key==="due_date") {
            i.dueDate(val);

            if (callback) callback('update-body', i);

            setUpdatedAt(new Date());
        };

        if (key==="date_next_action") {
            i.nextActionDate(val);

            if (callback) callback('update-body', i);

            setUpdatedAt(new Date());
        };
    };

    return (
        <div style={style} updated_at={updated_at.toDateString()}>
          {'l'===size && <Large issue={issue} sogh={sogh} callback={change} />}
          {'s'===size && <Small issue={issue} sogh={sogh} callback={change} />}
        </div>
    );
}
