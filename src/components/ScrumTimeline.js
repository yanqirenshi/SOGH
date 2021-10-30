import React, { useState, useEffect } from 'react';

import NotSignIn           from './common/NotSignIn.js';
import ButtonRefresh       from './common/ButtonRefresh.js';
import ProductAndMilestone from './common/ProductAndMilestone.js';
import DueDates            from './common/DueDates.js';
import Filter              from './common/FiltersIssue.js';
import OperatorOpenClose   from './common/OperatorOpenClose.js';
import Summary             from './common/Summary.js';

const style = {
    display:'flex',
    flexDirection: 'column',
    width:'100%',
    height:'100%',
    padding: 22,
};

export default function ScrumTimeline (props) {
    const [scrum, setScrum] = useState(null);
    const [mode, setMode] = useState('0');
    const [updated_at, setUpdatedAt] = useState(new Date());

    const sogh = props.sogh;
    const repository = props.repository;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    const invokeUpdate = () => setUpdatedAt(new Date());
    const refresh = () => scrum.fetch(repository, ()=> invokeUpdate());
    const changeFilter = (type, id) => scrum.changeFilter('timeline', type, id, ()=> invokeUpdate());
    const change = (e) => setMode(e.target.getAttribute('code'));

    useEffect(() => sogh && setScrum(sogh.scrum()), [repository]);
    useEffect(() => { if (scrum) refresh(); }, [scrum]);

    if (!scrum) return <NotSignIn />;

    const callbacks = {
        refresh: () => refresh(),
        filter: {
            click: (type, id)=> changeFilter(type, id),
            keyword: {
                change: (val)=> changeFilter('keyword', val),
            },
        },
        milestone: {
            change: (milestone)=> scrum.fetchIssues(milestone, ()=> invokeUpdate()),
        },
        duedate: {
            close: (v)=> scrum.changeCloseDueDates('close', v, invokeUpdate),
            open:  (v)=> scrum.changeCloseDueDates('open',  v, invokeUpdate),
        },
    };

    const base = scrum._data;
    const milestone = base.milestone;
    const milestones = base.milestones;
    const timeline = scrum._timeline;

    const dates = mode==='0' ? timeline.next_action_dates_filterd : timeline.duedates_filterd;

    return (
        <div style={style} updated_at={updated_at.toGMTString()}>
          <div>
            <ProductAndMilestone repository={repository}
                                 milestones={milestones}
                                 milestone={milestone}
                                 callbacks={callbacks} />
          </div>

          <div style={{marginBottom: 22, display: 'flex'}}>
            <div>
              <ButtonRefresh callbacks={callbacks} />
            </div>

            <Filter issues={base.issues}
                    filter={timeline.filter}
                    callbacks={callbacks}
                    sogh={scrum._sogh} />
          </div>

          <div>
            <div style={{display: 'flex'}}>
              <OperatorOpenClose callbacks={callbacks.duedate} />

              <div className="control" style={{marginLeft:22}}>
                <label className="radio">
                  <input type="radio" checked={mode==='0'}code="0" onChange={change} />
                  Next Action Date
                </label>
                <label className="radio">
                  <input type="radio" checked={mode==='1'} code="1" onChange={change} />
                  Due Date
                </label>
              </div>

            </div>

            <div style={{display:'flex'}}>
              <div>
                <Summary type="duedates"
                         source={scrum.summaryDuedates(dates)}/>
              </div>

              <div style={{flexGrow:1}}>
                <DueDates duedates={dates}
                          close_duedates={timeline.close_duedates}
                          callbacks={callbacks}
                          sogh={sogh}
                          productbacklog_url_prefix={productbacklog_url_prefix} />
              </div>
            </div>
          </div>
        </div>
    );
}
