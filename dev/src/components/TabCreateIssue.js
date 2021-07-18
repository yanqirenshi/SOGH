import React, { useState, useEffect } from 'react';

import Issue from '../lib/js/Issue.js';
import PanelCreateIssue from '../lib/components/PanelCreateIssue.js';


const ISSUE = new Issue();
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

export default function TabCreateIssue (props) {
    const [data, setData] = useState(null);

    const sogh = props.sogh;

    useEffect(() => {
        const new_data = ISSUE.makeIssueData();

        new_data.repository = sogh.activeRepository();
        new_data.description = description_template;

        setData(new_data);
    }, [sogh.activeRepository()]);

    const changeData = (data) => setData(data);

    const clickCreate = () => {
        sogh.createIssue(ISSUE.issueData2requestData(data), (ret) => {
            console.log(ret.errors ? 'error' : 'success');
        });
    };

    return (
        <>
          {data &&
           <div style={style}>
             <PanelCreateIssue data={data}
                               sogh={sogh}
                               callback={changeData}/>

             <div style={style.controller}>
               <button className="button is-warning">
                 Cancel
               </button>

               <button className="button is-danger" onClick={clickCreate}>
                 Create
               </button>
             </div>
           </div>}
        </>
    );
}

const description_template = `## 課題内容

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
`;
