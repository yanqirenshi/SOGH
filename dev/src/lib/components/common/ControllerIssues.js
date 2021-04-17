import React from 'react';

import ButtonRefresh from './ButtonRefresh.js';
import Filter from './Filter.js';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
};

export default function ControllerIssues (props) {
    return (
        <div style={style.root}>
          <div>
            <ButtonRefresh callbacks={props.callbacks} />
          </div>

          <Filter issues={props.issues}
                  filter={props.filter}
                  callbacks={props.callbacks}
                  sogh={props.sogh} />
        </div>
    );
}
