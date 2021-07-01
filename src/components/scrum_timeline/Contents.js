import React from 'react';

import ButtonRefresh from '../common/ButtonRefresh.js';
import ProductAndMilestone from '../common/ProductAndMilestone.js';
import DueDates from '../common/DueDates.js';
import Filter from '../common/Filter.js';
import OperatorOpenClose from '../common/OperatorOpenClose.js';

import Summary from './Summary.js';

import style from './Style.js';

export default function Contents (props) {
    const scrum = props.scrum;

    const repository = props.repository;
    const callbacks = props.callbacks;

    const base = scrum._data;
    const milestone = base.milestone;
    const milestones = base.milestones;
    const timeline = scrum._timeline;

    return (
        <div style={style.root}>
          <div>
            <ProductAndMilestone repository={repository}
                                 milestones={milestones}
                                 milestone={milestone}
                                 callbacks={callbacks} />
          </div>

          <div style={{marginBottom: 22, display: 'flex'}}>
            <div>
              <ButtonRefresh callbacks={props.callbacks} />
            </div>

            <Filter issues={base.issues}
                    filter={timeline.filter}
                    callbacks={props.callbacks}
                    sogh={scrum._sogh} />
          </div>

          <div>
            <OperatorOpenClose callbacks={callbacks.duedate} />

            <div style={{display:'flex'}}>
              <div>
                <Summary source={timeline.duedates_filterd}/>
              </div>

              <div style={{flexGrow:1}}>
                <DueDates duedates={timeline.duedates_filterd}
                          close_duedates={timeline.close_duedates}
                          callbacks={props.callbacks}
                          sogh={scrum._sogh}
                          productbacklog_url_prefix={props.productbacklog_url_prefix} />
              </div>
            </div>
          </div>
        </div>
    );
}
