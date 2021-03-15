import React from 'react';

import DueDate from './DueDate.js';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
};

export default function DueDates (props) {
    const sogh = props.sogh;

    const duedates = props.duedates;

    const keys = Object.keys(duedates.ht).sort((a,b) => a < b ? 1 : -1);

    if (keys[0]==='null') {
        keys.shift();
        keys.push('null');
    }

    return (
        <div style={style}>
          {keys.map(key => {
              return <DueDate key={key}
                              sogh={sogh}
                              title={key}
                              issues={duedates.ht[key]} />;
          })}
        </div>
    );
}
