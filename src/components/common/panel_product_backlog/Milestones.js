import React from 'react';

import Milestone from './Milestone.js';

export default function Milestones (props) {
    const project = props.project;
    const milestones = props.milestones.sort((a,b)=> a.dueOn < b.dueOn ? 1 : -1);
    const filter = props.filter;

    return (
        <section className="section" style={props.style}>
          <div className="container">
            {milestones.map(d => <Milestone key={d.id}
                                            source={d}
                                            project={project}
                                            filter={filter} />)}
          </div>
        </section>
    );
}
