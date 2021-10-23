import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import TableReports from './reports/TableReports.js';

function fetchReportIssues (repository, sogh, setIssues) {
    sogh.getIssuesByReportLabel(repository, (issues) => {
        const sorter= (a,b) => a.updatedAt < b.updatedAt ? 1 : -1;

        setIssues(issues.sort(sorter));
    });
}

export default function Reports (props) {
    const [issues, setIssues] = useState([]);
    const [opens, setOpens] = useState({});

    const sogh = props.sogh;
    const repository = props.repository;

    useEffect(() => fetchReportIssues(repository, sogh, setIssues), [sogh]);

    if (!sogh || !repository) return <NotSignIn />;

    const callbacks = {
        switch: (id) => {
            const new_opens = {...opens};

            if (new_opens[id])
                delete new_opens[id];
            else
                new_opens[id] = true;

            setOpens(new_opens);
        },
    };

    return (
       <div style={{padding:22}}>
          <TableReports issues={issues}
                        opens={opens}
                        callbacks={callbacks}
                        sogh={sogh}/>
        </div>
     );
}
