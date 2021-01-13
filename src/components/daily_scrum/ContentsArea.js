import React from 'react';

import SprintBacklogs  from './SprintBacklogs.js';
import ProductBacklogs from './ProductBacklogs.js';
import ProductAndMilestone from './ProductAndMilestone.js';
import Members from './Members.js';

export default function ContentsArea (props) {
    return (
        <div style={{marginBottom:111}}>
          <div style={{padding: '11px 22px'}}>
            <ProductAndMilestone />
          </div>

          <div style={{padding: '11px 22px'}}>
            <Members />
          </div>

          <div style={{display:'flex', padding: '11px 22px'}}>

            <div style={{width:222, marginRight:11}}>
              <ProductBacklogs />
            </div>

            <div style={{flexGrow:1, marginLeft: 11}}>
              <SprintBacklogs />
              <SprintBacklogs />
              <SprintBacklogs />
              <SprintBacklogs />
              <SprintBacklogs />
              <SprintBacklogs />
              <SprintBacklogs />
              <SprintBacklogs />
              <SprintBacklogs />
              <SprintBacklogs />
            </div>
          </div>
        </div>
    );
}
