import React from 'react';

import Milestones from './Milestones.js';
import Projects from './Projects.js';

const style = {
    root: {
        width:420,
    },
};

export default function Repository (props) {
    const filter = props.filter;
    const callbaks = props.callbaks;

    return (
        <div style={style.root}
             className="sogh-card-item box">

          <Milestones filter={filter} callbaks={callbaks} />
          <Projects   filter={filter} callbaks={callbaks} />
        </div>
    );
}
