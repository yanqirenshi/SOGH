import React, { useState, useEffect } from 'react';

import Sogh from '../js/Sogh.js';
import TableReports from './reports/TableReports.js';

function fetchReportIssues (repository, sogh, setIssues) {
    sogh.getIssuesByReportLabel(repository, (issues) => {
        const sorter= (a,b) => a.updatedAt < b.updatedAt ? 1 : -1;

        setIssues(issues.sort(sorter));
    });
}

export default function Reports (props) {
    const [sogh] = useState(new Sogh(props.token));
    const [issues, setIssues] = useState([]);
    const [opens, setOpens] = useState({});

    useEffect(() => fetchReportIssues(props.repository, sogh, setIssues), [sogh]);

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
