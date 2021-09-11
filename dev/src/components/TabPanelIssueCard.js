import React, { useState } from 'react';

import PanelIssue from '../lib/components/PanelIssue.js';

const style = {
    margin:10,
    head: {
        fontSize:14,
        padding:"6px 8px",
        display: 'flex'
    },
};

export default function TabPanelIssueCard (props) {
    const [open, setOpen] = useState(false);

    const sogh = props.sogh;
    const issue = props.issue;
    const callback = props.callback;

    const click = () => setOpen(!open);

    return (
        <nav className="panel" key={issue.id} style={style}>
          <div className="panel-heading"
               style={style.head}>
            <p style={{flexGrow:1}}>
              Issue
            </p>
            <p onClick={click}>ロ</p>
          </div>
          <div className="panel-block">
            <PanelIssue issue={issue}
                        sogh={sogh}
                        size={open ? 'l' : 's'}
                        w={open ? 500 : 200}
                        callback={callback} />
          </div>
        </nav>
    );
}
