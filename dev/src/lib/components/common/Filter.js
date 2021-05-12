import React from 'react';

import IconFilter from './IconFilter.js';
import FilterDevelopers from './FilterDevelopers.js';
import FilterStatus from './FilterStatus.js';
import FilterOthers from './FilterOthers.js';

const style = {
    display:'flex',
    paddingLeft: 22,
    alignItems: 'flex-start',
    item: {
        marginRight: 11,
        marginBottom: 8,
    },
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
          <div>
            <IconFilter />
          </div>

          <div style={{flexGrow:1, display:'flex', flexWrap: 'wrap'}}>
            {filter.assignees.list.length>0 && <p style={{marginRight: 8}}>Assignee:</p>}
            {filter.assignees.list.map((d,i)=>{
                return <FilterDevelopers key={d.id}
                                         style={style.item}
                                         assignee={d}
                                         filter={props.filter.assignees()}
                                         callbacks={props.callbacks} />;
            })}

            {filter.statuses.list.length>0 && <p style={{marginRight: 8}}>Status:</p>}
            {filter.statuses.list.map((d)=>{
                return <FilterStatus key={d.title}
                                     style={style.item}
                                     status={d}
                                     filter={props.filter.statuses()}
                                     callbacks={props.callbacks} />;
            })}

            {props.issues.length>0 && <p style={{marginRight: 8}}>Other:</p>}
            {props.issues.length>0 &&
             others.list.map((d)=>{
                 return <FilterOthers key={d.key}
                                      style={style.item}
                                      other={d}
                                      filter={props.filter.others()}
                                      callbacks={props.callbacks} />;
             })}
          </div>
        </div>
    );
}
