import React from 'react';

import Projects    from './tab_create_issue_new/Projects.js';
import Description from './tab_create_issue_new/Description.js';
import Labels      from './tab_create_issue_new/Labels.js';
import Assignees   from './tab_create_issue_new/Assignees.js';
import Milestones  from './tab_create_issue_new/Milestones.js';

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
        },
        labels: {
            width: 188,
        },
    },
    tail: {
        assignees: {
            overflow: 'auto',
            height: 88,
            marginBottom: 11,
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

export default function TabCreateIssueNew (props) {
    const root = {
        height:770, width: '100%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
    };

    const repo = props.sogh.active();

    return (
        <div code="xxx"
             style={root}>

          <div className="box" style={{width: 1200, height: 750}}>
            <div style={style}>

              <div style={style.head}>
                <input className="input is-small" type="text" placeholder="Title" />
              </div>

              <div style={style.body}>
                <div style={style.body.projects}>
                  <Projects source={repo.projects}/>
                </div>

                <div style={style.body.description}>
                  <Description source={description_template}/>
                </div>

                <div style={style.body.labels}>
                  <Labels source={repo.labels} />
                </div>
              </div>

              <div style={style.tail}>
                <div style={style.tail.assignees}>
                  <Assignees source={repo.assignees}/>
                </div>
                <div style={style.tail.milestones}>
                  <Milestones source={repo.milestones}/>
                </div>
              </div>
            </div>
          </div>

        </div>
    );
}

const description_template = `## 課題内容

XXX
- a
- b

## 目的/背景

YYYY

1. d
2. e

---
- $Point.Plan 1
- $Date.Due 2020-01-02
- $Date.Next 2020-01-03
- $Owner XXX
- $Point.Result 人1 2020-02-01 3
- $Point.Result 人2 2020-02-02 2
- $Point.Result 人3 2020-02-03 1
`;
