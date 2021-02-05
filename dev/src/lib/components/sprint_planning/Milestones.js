import React from 'react';
import moment from 'moment';

function isSelected (milestone, selected_milestone) {
    if (!selected_milestone)
        return null;

    if (milestone.id!==selected_milestone.id)
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

        props.callbacks.clickMilestone(milestones.find(d=>d.id===id));
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

          {milestones.map(d => {
              return <div key={d.id}
                          className="panel-block"
                          style={isSelected(d, milestone)}
                          milestone_id={d.id}
                          onClick={clickMilestone} >
                       <div>
                         <p>
                           {d.title.replace('【スプリント】','')}
                         </p>
                         <p>
                           <span style={{marginRight:11}}>
                             納期: {moment(d.dueOn).format('YYYY-MM-DD')}
                           </span>
                           (
                           <a href={d.url}>
                             {d.number}
                           </a>
                           )
                         </p>
                       </div>
                     </div>;
          })}
        </nav>
    );
}
