import React, { useState, useEffect } from 'react';
import moment from 'moment';

import ButtonRefresh from '../common/ButtonRefresh.js';
import ProductAndMilestone from '../common/ProductAndMilestone.js';
import DueDates from '../common/DueDates.js';
import Filter from '../common/Filter.js';

import style from './Style.js';

function targetMilestone (milestones) {
    const sorted = milestones.sort((a,b) => a.dueOn < b.dueOn ? -1 :1);
    const now = moment();

    for (const m of sorted)
        if (now.isSameOrBefore(moment(m.dueOn)))
            return m;

    return null;
}

export default function Contents (props) {
    const [changed, setChanged] = useState(null);

    const [milestones, setMilestones] = useState([]);
    const [milestone, setMilestone] = useState(null);
    const [issues, setIssues] = useState([]);
    const [issues_filterd, setIssuesFilterd] = useState([]);

    const [duedates, setDueDates] = useState({ht:[],list:[]});
    const [duedates_filterd, setDueDatesFilterd] = useState({ht:[],list:[]});

    const sogh = props.sogh;
    const filter = props.filter;

    const refresh = () => {
        if (issues.length>0)
            setIssues([]);

        sogh.getMilestonesByRepository(props.repository, (ret_milestones) => {
            setMilestones(ret_milestones);
        });
    };

    useEffect(refresh, []);

    useEffect(() => setMilestone(targetMilestone (milestones)), [milestones]);

    useEffect(() => {
        sogh.getIssuesByMilestone(milestone, (ret_issues) => setIssues(ret_issues));
    }, [milestone]);

    useEffect(() => {
        setDueDates(sogh.issues2dueDates(issues));
        setIssuesFilterd(sogh.filteringIssue(filter, issues));
    }, [issues, sogh, changed]);

    useEffect(() => {
        setDueDatesFilterd(sogh.issues2dueDates(issues_filterd));
    }, [sogh, issues_filterd]);

    const changeFilter = (type, id) => {
        filter.change(type, id);
        setChanged(new Date());
    };

    const setFilter = (type, v) => {
        filter.set(type, v);
        setChanged(new Date());
    };

    const callbacks = {
        refresh: () => refresh(),
        filter: {
            click: (type, id) => changeFilter(type, id),
        },
    };

    return (
        <div style={style.root}>
          <div>
            <ProductAndMilestone repository={props.repository}
                                 milestone={milestone} />
          </div>

          <div style={{marginBottom: 22, display: 'flex'}}>
            <div>
              <ButtonRefresh callbacks={callbacks} />
            </div>

            <Filter issues={issues}
                    filter={filter}
                    callbacks={callbacks}
                    sogh={sogh} />
          </div>

          <div>
            <DueDates duedates={duedates_filterd} sogh={sogh} />
          </div>
        </div>
    );
}
