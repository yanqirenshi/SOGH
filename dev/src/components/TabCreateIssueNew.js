import React, { useState, useEffect } from 'react';

import {Issue, PanelCreateIssue2} from '../lib/index.js';

const style = {
    width: '100%',
    height: '100%',
    display:'flex',
    flexDirection: 'column',
    box: {
        width: 1200,
        height: 750,
        display: 'flex',
        flexDirection: 'column'
    },
};

export default function TabCreateIssueNew (props) {
    const [data, setData] = useState(new Issue().makeIssueData());
    const [issue] = useState(new Issue());

    const root = {
        height:770, width: '100%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
    };

    const sogh = props.sogh;

    useEffect(() => {
        const new_data = {...data};

        new_data.repository = sogh.activeRepository();
        new_data.description = description_template;

        setData(new_data);
    }, [sogh.activeRepository()]);

    const changed = (d) => setData(d);
    const create = () => {
        sogh.createIssue(issue.issueData2requestData(data), (ret) => {
            console.log(ret.errors ? 'error' : 'success');
        });
    };

    return (
        <div style={root}>
          <div className="box" style={style.box}>
            <div style={{flexGrow:1}}>
              <PanelCreateIssue2 source={data}
                                 sogh={sogh}
                                 callback={changed} />
            </div>

            <div style={{display: 'flex', padding: 8}}>
              <button className="button is-warning is-small">
                Cancel
              </button>

              <button className="button is-danger is-small"
                      onClick={create}>
                Create
              </button>
            </div>
          </div>
        </div>
    );
}

const description_template = `## 課題内容

XXX
- a

## 目的/背景

YYYY

1. d

---
- $Date.Next 2020-01-03
- $Owner XXX
- $Date.Due 2020-01-02
- $Point.Plan 1
- $Point.Result 人1 2020-02-01 3
- $Point.Result 人2 2020-02-02 2`;
