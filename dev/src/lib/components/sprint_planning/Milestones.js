import React from 'react';
import moment from 'moment';
import ANewTab from '../common/ANewTab.js';

function isSelected (milestone, selected_milestone) {
    if (!selected_milestone)
        return null;

    if (milestone.id()!==selected_milestone.id())
        return null;

    return {fontWeight:'bold'};
}

export default function Milestones (props) {
    const milestones = props.milestones;
    const milestone = props.milestone;

    const clearMilestone = () => props.callbacks.clearMilestone();

    const clickMilestone = (e) => {
        const trg = (element) => {
            if (element.tagName==='DIV' && element.classList.contains("panel-block"))
                return element;

            return trg(element.parentNode);
        };

        const id = trg(e.target).getAttribute('milestone_id');

        props.callbacks.clickMilestone(milestones.find(milestone=>milestone.id()===id));
    };

    return (
        <nav className="panel">
          <p className="panel-heading" style={{fontSize:14}}>
            Milestones
          </p>

          <div className="panel-block">
            <button className="button is-fullwidth"
                    onClick={clearMilestone}>
              Clear (All Projects)
            </button>
          </div>

          {milestones.map(m => {
              const milestone_id = m.id();

              return (
                  <div key={milestone_id}
                       className="panel-block"
                       style={isSelected(m, milestone)}
                       milestone_id={milestone_id}
                       onClick={clickMilestone} >
                    <div>
                      <p>
                        {m.title().replace('【スプリント】','')}
                      </p>
                      <p>
                        <span style={{marginRight:11}}>
                          納期: {moment(m.dueOn()).format('YYYY-MM-DD')}
                        </span>
                        (
                        <ANewTab to={m.url()}>
                          {m.number()}
                        </ANewTab>
                        )
                      </p>
                    </div>
                  </div>
              );
          })}
        </nav>
    );
}
