import React from 'react';

import IconFilter from './IconFilter.js';
import FilterDevelopers from './FilterDevelopers.js';
import FilterStatus from './FilterStatus.js';
import FilterOthers from './FilterOthers.js';

const style = {
    display:'flex',
    flexWrap: 'wrap',
    paddingLeft: 22,
    alignItems: 'center'
};

export default function Filter (props) {
    const sogh = props.sogh;

    const filter = sogh.issues2filter(props.issues);

    const others = {
        list: [
            { title: 'Yesterday',     key: 'Yesterday' },
            { title: 'XX待ち',        key: 'Waiting' },
            { title: 'Plan 未入力',   key: 'EmptyPlan' },
            { title: 'Diff -', key: 'DiffMinus' },
        ],
    };

    return (
        <div style={style}>
          <IconFilter />

          {filter.assignees.list.map((d,i)=>{
              return <FilterDevelopers key={d.id}
                                       style={{marginLeft: i===0 ? 0 : 11}}
                                       assignee={d}
                                       filter={props.filter.assignees()}
                                       callbacks={props.callbacks} />;
          })}

          {filter.statuses.list.map((d)=>{
              return <FilterStatus key={d.title}
                                   style={{marginLeft: 11}}
                                   status={d}
                                   filter={props.filter.statuses()}
                                   callbacks={props.callbacks} />;
          })}

          {props.issues.length>0 &&
           others.list.map((d)=>{
              return <FilterOthers key={d.key}
                                   style={{marginLeft: 11}}
                                   other={d}
                                   filter={props.filter.others()}
                                   callbacks={props.callbacks} />;
          })}
        </div>
    );
}
