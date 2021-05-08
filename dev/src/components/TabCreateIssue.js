import React, { useState } from 'react';

import PanelCreateIssue from './PanelCreateIssue.js';

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
};

const template = `## 課題内容

XXX
- a
- b
- c

## 目的/背景

YYYY

1. d
2. e
3. f

---
- @Point.Plan: n
- @Point.Result: n
- @Due.Date: yyyy-mm-dd
`

function setSingle (type, v, data) {
    const new_data = {...data};

    new_data[type] = v;

    return new_data;
}

function switchSingle (type, v, data) {
    const new_data = {...data};

    if (!new_data[type] || new_data[type].id!==v.id)
        new_data[type] = v;
    else
        new_data[type] = null;

    return new_data;
}

function switchMulti (type, v, data) {
    const new_data = {...data};

    if (new_data[type].find(d=>d.id===v.id))
        new_data[type] = new_data[type].filter(d=>d.id!==v.id);
    else
        new_data[type].push(v);

    return new_data;
}

export default function TabCreateIssue (props) {
    const [data, setData] = useState({
        title: '',
        description: template,
        projects: [],
        milestone: null,
        labels: [],
        assignees: [],
    });

    const sogh = props.sogh;

    const callbacks = {
        change: {
            title:       (v) => setData(setSingle('title', v, data)),
            description: (v) => setData(setSingle('description', v, data)),
            projects:    (v) => setData(switchMulti('projects', v, data)),
            milestone:   (v) => setData(switchSingle('milestone', v, data)),
            labels:      (v) => setData(switchMulti('labels', v, data)),
            assignees:   (v) => setData(switchMulti('assignees',v, data)),
        },
    };

    return (
             <div style={style}>
               <PanelCreateIssue data={data}
                                 callbacks={callbacks}
                                 sogh={sogh}/>
             </div>
    );
}
