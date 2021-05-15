import React, { useState } from 'react';

import PanelCreateIssue from '../lib/components/PanelCreateIssue.js';

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    controller: {
        marginTop:11,
        display: 'flex',
        width: 888,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'space-between',
    },
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

    const clickCreate = () => {
        const ids = (l) => l.map(d=>d.id);

        const repository = sogh.getRepository(
            process.env.REACT_APP_GITHUB_REPOSITORY_OWNER,
            process.env.REACT_APP_GITHUB_REPOSITORY_NAME,
        );

        const issue_data = {
            repositoryId: repository.id,
            title: data.title,
            body: data.description,
            projectIds:  ids(data.projects),
            milestoneId: data.milestone ? data.milestone.id : null,
            labelIds:    ids(data.labels),
            assigneeIds: ids(data.assignees),
        };

        sogh.createIssue(issue_data, () => {
            console.log('yy');
        });
    };

    return (
        <div style={style}>
          <PanelCreateIssue data={data}
                            callbacks={callbacks}
                            sogh={sogh}/>

          <div style={style.controller}>
            <button className="button is-warning">
              Cancel
            </button>

            <button className="button is-danger"
                    onClick={clickCreate}>
              Create
            </button>
          </div>
        </div>
    );
}
