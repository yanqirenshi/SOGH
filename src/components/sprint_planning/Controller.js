import React from 'react';

import Filter from '../common/FiltersIssue.js';
import ControllerProductBacklogs from '../common/ControllerProductBacklogs.js';

export default function Controller (props) {
    const sogh = props.sogh;
    const issues = props.issues;
    const filter = props.filter;
    const callbacks = props.callbacks;

    return (
        <div style={{display: 'flex'}}>
          <div>
            <ControllerProductBacklogs sogh={sogh} callbacks={callbacks} />
          </div>

          <Filter filter={filter}
                  issues={issues}
                  callbacks={callbacks}
                  sogh={sogh}/>
        </div>
    );
}
