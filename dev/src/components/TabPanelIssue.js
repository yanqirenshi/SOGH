import React, { useState, useEffect } from 'react';

import TabPanelIssueCard from './TabPanelIssueCard.js';

const style = {
    width: '100%',
    height: '100%',
    display:'flex',
    flexDirection: 'column',
    container: {
        padding: 22,
        display:'flex',
        flexWrap: 'wrap',
    }
};

export default function TabPanelIssue (props) {
    const [issues, setIssues] = useState([]);

    const sogh = props.sogh;
    const repo = props.repository;

    useEffect(() => {
        if (!sogh || !repo) return;

        sogh.getIssuesOpenByRepository(
            repo,
            (issues)=> setIssues(issues),
            (issues, page_info)=> null);
            // (issues, page_info)=> console.log([issues, page_info]));
    }, [sogh, repo]);

    const callback = (action, data) => {
        console.log([action]);
        console.log([data.id(), data.body()]);
    };

    return (
        <div style={style}>
          <div style={style.container}>
            {issues.map(issue => {
                return (
                    <TabPanelIssueCard key={issue.id()}
                                       issue={issue}
                                       sogh={sogh}
                                       callback={callback} />
                );
            })}
          </div>
        </div>
    );
}
