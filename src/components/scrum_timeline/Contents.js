import React from 'react';

import ButtonRefresh from '../common/ButtonRefresh.js';
import ProductAndMilestone from '../common/ProductAndMilestone.js';
import DueDates from '../common/DueDates.js';
import Filter from '../common/Filter.js';

import style from './Style.js';

export default function Contents (props) {
    const scrum = props.scrum;

    const repository = props.repository;
    const callbacks = props.callbacks;

    const base = scrum._data;
    const milestone = base.milestone;
    const milestones = base.milestones;

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

            <Filter issues={scrum._data.issues}
                    filter={scrum._timeline.filter}
                    callbacks={props.callbacks}
                    sogh={scrum._sogh} />
          </div>

          <div>
            <DueDates duedates={scrum._timeline.duedates_filterd}
                      sogh={scrum._sogh} />
          </div>
        </div>
    );
}
