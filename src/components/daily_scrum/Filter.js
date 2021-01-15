import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import FilterDevelopers from './FilterDevelopers.js';
import FilterStatus from './FilterStatus.js';
import FilterOthers from './FilterOthers.js';

export default function Filter (props) {
    const assignees = { ht: {}, list: [] };
    const statuses = { ht: {}, list: [] };

    for (const issue of props.issues) {
        const k = issue.closedAt ? 'Close' : 'Open';
        if (!statuses.ht[k]) {
            const d = { title: k, count: 1 };
            statuses.ht[k] = d;
            statuses.list.push(d);
        } else {
            statuses.ht[k].count += 1;
        }

        for (const a of issue.assignees.nodes) {
            if (!assignees.ht[a.id]) {
                assignees.ht[a.id] = a;
                assignees.list.push(a);
                a.issues = [];
            }

            const assignee = assignees.ht[a.id];

            assignee.issues.push(issue);
        }
    }
    const others = {
        list: [{ title: 'Yesterday' }],
    };
    return (
        <div className="box">
          <div className="contents" style={{display:'flex', flexWrap: 'wrap'}}>
            <div style={{fontSize: 26,paddingTop: 4,marginRight: 22,marginLeft: 7, color: '#888'}}>
              <FontAwesomeIcon style={{}} icon={faFilter} />
            </div>
            {assignees.list.map((d,i)=>{
                return <FilterDevelopers key={d.id}
                                         style={{marginLeft: i===0 ? 0 : 22}}
                                         assignee={d}
                                         filter={props.filter.assignee}
                                         callbacks={props.callbacks} />;
            })}

            {statuses.list.map((d)=>{
                return <FilterStatus key={d.title}
                                     style={{marginLeft: 22}}
                                     status={d}
                                         filter={props.filter.status}
                                     callbacks={props.callbacks} />;
            })}

            {others.list.map((d)=>{
                return <FilterOthers key={d.title}
                                     style={{marginLeft: 22}}
                                     other={d}
                                     filter={props.filter.others}
                                     callbacks={props.callbacks} />;
            })}

          </div>
        </div>
    );
}
