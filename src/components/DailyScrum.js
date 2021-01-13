import React from 'react';

import ContentsArea  from './daily_scrum/ContentsArea.js';
import SprintListArea from './daily_scrum/SprintListArea.js';

const style = {
    root: {
        display:'flex',
        flexDirection: 'column',
        width:'100%',
        height:'100%',
    },
};

export default function DailyScrum (props) {
    return (
        <div style={style.root}>
          <div style={{flexGrow:1, overflow: 'auto'}}>
            <ContentsArea />
          </div>

          <div style={{display:'flex', padding: 11, boxShadow: '0px 0px 8px #ccc'}}>
            <SprintListArea />
          </div>
        </div>
    );
}
