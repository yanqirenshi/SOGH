import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function Search (props) {
    const sogh = props.sogh;
    const callbacks = props.callbacks;

    const changeKeyword = (e) => callbacks.keyword.change(e.target.value);
    const clearKeyword = (e) => callbacks.keyword.change('');
    const switchPriority = (e) => callbacks.priority.switch(e.target.getAttribute('code'));

    const priorities = sogh.getFilterPriorities(props.projects);

    return (
        <div style={{display:'flex'}}>

          <div style={{fontSize: 22, paddingTop: 4, marginRight: 22, color: '#888'}}>
            <FontAwesomeIcon style={{}} icon={faFilter} />
          </div>


          <div style={{display:'flex', width:333}}>

            <input className="input"
                   type="text"
                   placeholder="Search Project Name"
                   onKeyUp={changeKeyword} />

            <button className="button"
                    onClick={clearKeyword}>
              Clear
            </button>
          </div>

          <div style={{display: 'flex', marginLeft: 33}}>
            {priorities.map(d => {
                const style = {
                    height: 40,
                    padding: '11px 22px',
                    marginRight: 22
                };

                if (props.filter.priorities[d.code]) {
                    style.border = '1px solid #eeeeee';
                    style.boxShadow = 'none';
                }

                return <div key={d.code}
                            code={d.code}
                            className="card"
                            style={style}
                            onClick={switchPriority}>
                         {sogh.priorityLabel(d.code) + ` (${d.count})`}
                       </div>;
            })}
          </div>

        </div>
    );
}
