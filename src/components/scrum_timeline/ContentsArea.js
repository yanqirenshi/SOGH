import React from 'react';

import ButtonRefresh from '../common/ButtonRefresh.js';
import ProductBacklogs from '../common/ProductBacklogs.js';

import ListProductBacklogs from './ListProductBacklogs.js';
import ProductAndMilestone from './ProductAndMilestone.js';
import Filter from '../common/Filter.js';
import ChartBardown from '../common/ChartBardown.js';

import style from './Style.js';

export default function ContentsArea (props) {
    const sogh = props.sogh;

    const projects = props.duedates;
    const projects_filterd = props.duedates_filterd;

    const sorted_projects = projects.list;
    const sorted_projects_filterd = projects_filterd.list;

    return (
        <div style={style.contents_area.root}>
          <div style={style.contents_area.head}>
            <ProductAndMilestone repository={props.repository}
                                 milestone={props.milestone} />
          </div>

          {/* <div style={style.contents_area.controller}> */}
          {/*   <div> */}
          {/*     <ButtonRefresh callbacks={props.callbacks} /> */}
          {/*   </div> */}

          {/*   <Filter issues={props.issues} */}
          {/*           filter={props.filter} */}
          {/*           callbacks={props.callbacks} */}
          {/*           sogh={sogh} /> */}
          {/* </div> */}

          {/* <div style={style.contents_area.body}> */}

          {/*   <div style={{minWidth:333, maxWidth:333}}> */}
          {/*     <ListProductBacklogs projects={sorted_projects} */}
          {/*                          filter={props.filter} */}
          {/*                          callbacks={props.callbacks} /> */}
          {/*   </div> */}

          {/*   <div style={{flexGrow:1, marginLeft: 11}}> */}
          {/*     <div> */}
          {/*       <ChartBardown issues={props.issues} */}
          {/*                     milestone={props.milestone} /> */}
          {/*     </div> */}

          {/*     <ProductBacklogs projects={sorted_projects_filterd} */}
          {/*                      close_projects={props.close_projects} */}
          {/*                      callbacks={props.callbacks} */}
          {/*                      sogh={sogh} /> */}
          {/*   </div> */}
          {/* </div> */}

          <div>
              <ProductBacklogs projects={sorted_projects_filterd}
                               close_projects={props.close_projects}
                               callbacks={props.callbacks}
                               sogh={sogh} />
          </div>
        </div>
    );
}
