import React from 'react';

import IconFilter from './IconFilter.js';
import FilterDevelopers from './FilterDevelopers.js';
import FilterStatus from './FilterStatus.js';
import FilterOthers from './FilterOthers.js';

const style = {
    display:'flex',
    paddingLeft: 22,
    alignItems: 'flex-start',
    search: {
        display:'flex',
        width:255,
        marginRight: 11,
        marginBottom: 11,
    },
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
            { title: 'Today',         key: 'today' },
            { title: 'XX待ち',        key: 'Waiting' },
            { title: 'Plan 未入力',   key: 'EmptyPlan' },
            { title: 'Diff -',        key: 'DiffMinus' },
        ],
    };

    const callbacks = props.callbacks;
    const changeKeyword = (e) => callbacks.filter.keyword.change(e.target.value);
    const clearKeyword  = (e) => callbacks.filter.keyword.change('');

    const assignees = filter.assignees.list;
    const statuses = filter.statuses.list;
    const issues = props.issues;
    const keyword = props.filter.keyword() || '';

    return (
        <div style={style}>
          <div>
            <IconFilter />
          </div>

          <div style={{flexGrow:1, display:'flex', flexWrap: 'wrap'}}>
            {assignees.length>0 &&
             <div style={style.search}>
               <input className="input is-small"
                      type="text"
                      placeholder="Search Project Name"
                      value={keyword}
                      onChange={changeKeyword} />

               <button className="button is-small"
                       onClick={clearKeyword}>
                 Clear
               </button>
             </div>}

            {assignees.length>0 &&
             <p style={{marginRight: 8}}>Assignee:</p>}

            {assignees.map((d,i)=>{
                return <FilterDevelopers key={d.id}
                                         style={style.item}
                                         assignee={d}
                                         filter={props.filter.assignees()}
                                         callbacks={props.callbacks} />;
            })}

            {statuses.length>0 && <p style={{marginRight: 8}}>Status:</p>}
            {statuses.map((d)=>{
                return <FilterStatus key={d.title}
                                     style={style.item}
                                     status={d}
                                     filter={props.filter.statuses()}
                                     callbacks={props.callbacks} />;
            })}

            {issues.length>0 && <p style={{marginRight: 8}}>Other:</p>}
            {issues.length>0 &&
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
