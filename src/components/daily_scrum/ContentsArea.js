import React, { useState } from 'react';

import Core from './Core.js';

import SprintBacklogs  from './SprintBacklogs.js';
import ProductBacklogs from './ProductBacklogs.js';
import ProductAndMilestone from './ProductAndMilestone.js';
import Filter from './Filter.js';

import style from './Style.js';

export default function ContentsArea (props) {
    const [core] = useState(new Core());

    const issues_filterd = core.filteringIssue(props.filter, props.issues);
    const projects = core.issues2projects(issues_filterd);

    return (
        <div style={style.contents_area.root}>
          <div style={style.contents_area.head}>
            <ProductAndMilestone repository={props.repository}
                                 milestone={props.milestone} />
          </div>

          <div style={style.contents_area.filter}>
            <Filter issues={props.issues}
                    filter={props.filter}
                    callbacks={props.callbacks} />
          </div>

          <div style={style.contents_area.body}>

            <div style={{width:333, marginRight:11}}>
              <ProductBacklogs projects={projects}/>
            </div>

            <div style={{flexGrow:1, marginLeft: 11}}>
              {projects.list.sort((a,b)=>a.title<b.title?-1:1).map(d => <SprintBacklogs key={d.id} project={d} />)}
            </div>
          </div>
        </div>
    );
}
