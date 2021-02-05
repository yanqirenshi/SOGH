import React from 'react';

import IconFilter from './IconFilter.js';
import FilterDevelopers from './FilterDevelopers.js';
import FilterStatus from './FilterStatus.js';

const style = {
    display:'flex',
    flexWrap: 'wrap',
    paddingLeft: 22,
    marginBottom: 8,
};

export default function Filter (props) {
    const sogh = props.sogh;

    const filter = sogh.issues2filter(props.issues);

    return (
        <div style={style}>
          <IconFilter />

          {filter.assignees.list.map((d,i)=>{
              return <FilterDevelopers key={d.id}
                                       style={{marginLeft: i===0 ? 0 : 22}}
                                       assignee={d}
                                       filter={props.filter.assignee}
                                       callbacks={props.callbacks} />;
          })}

          {filter.statuses.list.map((d)=>{
              return <FilterStatus key={d.title}
                                          style={{marginLeft: 22}}
                                          status={d}
                                          filter={props.filter.status}
                                          callbacks={props.callbacks} />;
          })}
        </div>
    );
}
