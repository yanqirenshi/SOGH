import React from 'react';

import Projects    from './panel_create_issue/Projects.js';
import Description from './panel_create_issue/Description.js';
import Labels      from './panel_create_issue/Labels.js';
import Assignees   from './panel_create_issue/Assignees.js';
import Milestones  from './panel_create_issue/Milestones.js';

const style = {
    width: '100%',
    height: '100%',
    display:'flex',
    flexDirection: 'column',
    head: {
        padding: 0,
        marginBottom: 6,
    },
    body: {
        display:'flex',
        flexGrow: 1,
        marginBottom: 6,
        projects: {
            width: 188,
        },
        description: {
            marginLeft:8,
            marginRight:8,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        labels: {
            width: 188,
        },
    },
    tail: {
        assignees: {
            overflow: 'auto',
            height: 88,
            marginBottom: 6,
            border: '1px solid #ddd',
            padding: 3,
        },
        milestones: {
            overflow: 'auto',
            height: 88,
            border: '1px solid #ddd',
            padding: 3,
        },
    },
};

export default function PanelCreateIssue (props) {
    const data = props.source;
    const repo = props.sogh.active();
    const callback = props.callback;

    const change = (e) => {
        const new_value = e.target.value;
        const new_data = {...data};

        new_data.title = new_value;

        callback(new_data);
    };

    return (
        <div style={style}>
          <div style={style.head}>
            <input className="input is-small"
                   type="text"
                   placeholder="Title"
                   value={data.title}
                   onChange={change} />
          </div>

          <div style={style.body}>
            <div style={style.body.projects}>
              <Projects source={data} projects={repo.projects} callback={callback} />
            </div>

            <div style={style.body.description}>
              <Description source={data} callback={callback}/>
            </div>

            <div style={style.body.labels}>
              <Labels source={data} labels={repo.labels} callback={callback} />
            </div>
          </div>

          <div style={style.tail}>
            <div style={style.tail.assignees}>
              <Assignees source={data} assignees={repo.assignees} callback={callback} />
            </div>
            <div style={style.tail.milestones}>
              <Milestones source={data} milestones={repo.milestones} callback={callback} />
            </div>
          </div>
        </div>
    );
}
