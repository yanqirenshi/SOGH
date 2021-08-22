import React, { useState } from 'react';

import Issue from '../js/Issue.js';

import Large from './panel_issue/Large.js';
import Small from './panel_issue/Small.js';

export default function PanelIssue (props) {
    const [updated_at, setUpdatedAt] = useState(null);

    const issue = props.issue;
    const sogh = props.sogh;
    const size = props.size;

    const style = {
        width: props.w || 200,
    };

    const callback = (key, val) => {
        const i = new Issue(issue);

        if (key==="due_date") {
            i.dueDate(val);
            console.log(i.dueDate());
            setUpdatedAt(new Date());
        };

        if (key==="date_next_action") {
            i.nextActionDate(val);
            console.log(i.nextActionDate());
            setUpdatedAt(new Date());
        };
    };

    return (
        <div style={style}>
          {'l'===size && <Large issue={issue} sogh={sogh} callback={callback} />}
          {'s'===size && <Small issue={issue} sogh={sogh} callback={callback} />}
        </div>
    );
}
