import React from 'react';
// import React, { useState } from 'react';

// import Sogh from '../js/Sogh.js';

import Milestone from './product_backlog/Milestone.js';

export default function ProductBacklog (props) {
    // const [sogh] = useState(new Sogh(props.token));
    return (
        <div>
          <section className="section">
            <div className="container">
              <div>Basic</div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
            </div>
          </section>
        </div>
    );
}
