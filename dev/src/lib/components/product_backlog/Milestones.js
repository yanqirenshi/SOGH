import React from 'react';

import Milestone from './Milestone.js';

export default function Milestones (props) {
    const milestones = props.milestones;
    const project = props.project;

    return (
        <section className="section">
          <div className="container">
            {milestones.map(d => <Milestone key={d.id}
                                            source={d}
                                            project={project} />)}
          </div>
        </section>
    );
}
