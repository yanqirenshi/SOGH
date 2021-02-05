import React from 'react';

import ButtonRefresh from '../common/ButtonRefresh.js';
import ProductBacklogs from '../common/ProductBacklogs.js';

import ListProductBacklogs from './ListProductBacklogs.js';
import ProductAndMilestone from './ProductAndMilestone.js';
import Filter from './Filter.js';

import style from './Style.js';

export default function ContentsArea (props) {
    const sogh = props.sogh;

    const projects = props.projects;
    const projects_filterd = props.projects_filterd;

    const sorted_projects = sogh.sortProjectsByPriority(projects.list);
    const sorted_projects_filterd = sogh.sortProjectsByPriority(projects_filterd.list);

    return (
        <div style={style.contents_area.root}>
          <div style={style.contents_area.head}>
            <ProductAndMilestone repository={props.repository}
                                 milestone={props.milestone} />
          </div>

          <div style={style.contents_area.controller}>
            <div>
              <ButtonRefresh callbacks={props.callbacks} />
            </div>

            <Filter issues={props.issues}
                    filter={props.filter}
                    callbacks={props.callbacks}
                    sogh={sogh} />
          </div>

          <div style={style.contents_area.body}>

            <div style={{width:333, marginRight:11}}>
              <ListProductBacklogs projects={sorted_projects}
                                   filter={props.filter}
                                   callbacks={props.callbacks} />
            </div>

            <div style={{flexGrow:1, marginLeft: 11}}>
              <ProductBacklogs projects={sorted_projects_filterd}
                               close_projects={props.close_projects}
                               callbacks={props.callbacks}
                               sogh={sogh} />
            </div>
          </div>
        </div>
    );
}
