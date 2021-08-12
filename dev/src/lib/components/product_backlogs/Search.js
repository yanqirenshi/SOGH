import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ButtonToggle from '../common/ButtonToggle.js';

const style = {
    display:'flex',
    icon: { fontSize: 14, paddingTop: 4, marginRight: 11, color: '#888' },
    search: {
        display:'flex',
        width:255,
        marginRight: 11,
        marginBottom: 11,
    },
    toggles: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginLeft: 11,
    },
}

export default function Search (props) {
    const sogh = props.sogh;
    const core = props.core;
    const callbacks = props.callbacks;

    const filters = core.getFilters(props.projects);

    const changeKeyword = (e) => callbacks.keyword.change(e.target.value);
    const clearKeyword = (e) => callbacks.keyword.change('');
    const switchPriority = (code) => {
        const f = d => d.code===code;

        const item = filters.assignees.find(f)
              || filters.types.find(f)
              || filters.priorities.find(f);

        callbacks.priority.switch(item);
    };


    const makeLabelString = (d) => {
        if ('priorities'===d.type)
            return sogh.priorityLabel(d.value) + ` (${d.count})`;

        if ('types'===d.type || 'assignees'===d.type)
            return d.value + ` (${d.count})`;

        return '???';
    };
    console.log(props.filter.keyword);
    return (
        <div style={style}>

          <div style={style.icon}>
            <FontAwesomeIcon icon={faFilter} />
          </div>

          <div style={style.toggles}>
            <div style={style.search}>
              <input className="input is-small"
                     type="text"
                     placeholder="Search Project Name"
                     value={props.filter.keyword || ''}
                     onChange={changeKeyword} />

              <button className="button is-small"
                      onClick={clearKeyword}>
                Clear
              </button>
            </div>

            <p style={{marginBottom: 11}}>Priority：</p>
            {filters.priorities.map(d => {
                const label = makeLabelString(d);
                return <ButtonToggle key={d.code}
                                     style={{marginBottom:11}}
                                     code={d.code}
                                     label={label}
                                     on={props.filter.priorities[d.code]}
                                     callback={switchPriority} />;
            })}

            <p style={{marginBottom: 11}}>Type：</p>
            {filters.types.map(d => {
                const label = makeLabelString(d);
                return <ButtonToggle key={d.code}
                                     style={{marginBottom:11}}
                                     code={d.code}
                                     label={label}
                                     on={props.filter.types[d.code]}
                                     callback={switchPriority} />;
            })}

            <p style={{marginBottom: 11}}>Assignee：</p>
            {filters.assignees.map(d => {
                const label = makeLabelString(d);
                return <ButtonToggle key={d.code}
                                     style={{marginBottom:11}}
                                     code={d.code}
                                     label={label}
                                     on={props.filter.assignees[d.code]}
                                     callback={switchPriority} />;
            })}
          </div>

        </div>
    );
}
