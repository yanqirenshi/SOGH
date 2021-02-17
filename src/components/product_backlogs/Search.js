import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ButtonToggle from '../common/ButtonToggle.js';

export default function Search (props) {
    const sogh = props.sogh;
    const callbacks = props.callbacks;

    const changeKeyword = (e) => callbacks.keyword.change(e.target.value);
    const clearKeyword = (e) => callbacks.keyword.change('');
    const switchPriority = (code) => callbacks.priority.switch(code);

    const priorities = sogh.getFilterPriorities(props.projects);

    return (
        <div style={{display:'flex'}}>

          <div style={{fontSize: 22, paddingTop: 4, marginRight: 22, color: '#888'}}>
            <FontAwesomeIcon style={{}} icon={faFilter} />
          </div>


          <div style={{display:'flex', width:255}}>

            <input className="input"
                   type="text"
                   placeholder="Search Project Name"
                   onKeyUp={changeKeyword} />

            <button className="button"
                    onClick={clearKeyword}>
              Clear
            </button>
          </div>

          <div style={{display: 'flex', marginLeft: 22}}>
            {priorities.map(d => {
                const label = sogh.priorityLabel(d.code) + ` (${d.count})`;
                return <ButtonToggle key={d.code}
                                     code={d.code}
                                     label={label}
                                     on={props.filter.priorities[d.code]}
                                     callback={switchPriority} />;
            })}
          </div>

        </div>
    );
}
