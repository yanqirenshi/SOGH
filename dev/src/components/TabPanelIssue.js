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

        sogh.getIssuesByRepository(repo, (issues) => setIssues(issues));
    }, [sogh, repo]);

    return (
        <div style={style}>
          <div style={style.container}>
            {issues.map(issue => <TabPanelIssueCard key={issue.id} issue={issue} sogh={sogh}/>)}
          </div>
        </div>
    );
}
