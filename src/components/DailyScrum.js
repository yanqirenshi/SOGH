import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Sogh from '../js/Sogh.js';
import ContentsArea  from './daily_scrum/ContentsArea.js';
import SprintListArea from './daily_scrum/SprintListArea.js';

import style from './daily_scrum/Style.js';

function targetMilestone (milestones) {
    const sorted = milestones.sort((a,b) => a.dueOn < b.dueOn ? -1 :1);
    const now = moment().add('d', '7');

    let trg = null;
    for (const m of sorted) {
        if (now.isSameOrBefore(moment(m.dueOn)))
            return trg;
        else
            trg = m;
    }

    return null;
}

export default function DailyScrum (props) {
    const [sogh] = useState(new Sogh(process.env.REACT_APP_GITHUB_PARSONAL_TOKEN));
    const [repository] = useState({owner: 'booklista', name:'docs.Bookpass'});
    const [milestones, setMilestones] = useState([]);
    const [milestone, setMilestone] = useState(null);
    const [issues, setIssues] = useState([]);
    const [filter, setFilter] = useState({
        assignee: [],
        status: { Open: true, Close: true },
        others: { Yesterday: false },
    });

    useEffect(() => {
        sogh.getMilestonesByRepository(repository, (ret_milestones) => {
            setMilestones(ret_milestones);
        });
    }, []);

    useEffect(() => setMilestone(targetMilestone (milestones)), [milestones]);

    useEffect(() => {
        sogh.getIssuesByMilestone(milestone, (ret_issues) => {
            setIssues(issues.concat(ret_issues));
        });
    }, [milestone]);

    const callbacks = {
        filter: {
            click: (type, id) => {
                if (type==='assignee') {
                    const new_filter = {...filter};
                    const new_assignee = [...new_filter.assignee];

                    const pos = new_assignee.indexOf(id);
                    if (pos===-1)
                        new_assignee.push(id);
                    else
                        new_assignee.splice(pos, 1);

                    new_filter.assignee = new_assignee;

                    setFilter(new_filter);
                }

                if (type==='status') {
                    const new_filter = {...filter};
                    const new_status = {...new_filter.status};

                    new_status[id] = !new_status[id];

                    new_filter.status = new_status;

                    setFilter(new_filter);
                }

                if (type==='others') {
                    const new_filter = {...filter};
                    const new_others = {...new_filter.others};

                    new_others[id] = !new_others[id];

                    new_filter.others = new_others;

                    setFilter(new_filter);
                }
            }
        }
    };

    return (
        <div style={style.root}>
          <div style={{flexGrow:1, overflow: 'auto'}}>
            <ContentsArea repository={repository}
                          milestone={milestone}
                          filter={filter}
                          issues={issues}
                          callbacks={callbacks} />
          </div>

          <div style={{display:'flex', padding: 11, boxShadow: '0px 0px 8px #ccc'}}>
            <SprintListArea milestones={milestones}
                            issues={issues} />
          </div>
        </div>
    );
}
