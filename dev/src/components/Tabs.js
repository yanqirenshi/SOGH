import React from 'react';
import { Link } from "react-router-dom";

function TabsRoot (props) {
    return (
        <div className="tabs is-boxed is-centered">
          <ul>
            {props.tabs.map(d => {
                return (
                    <li key={d.code}
                        className={d.code===props.selected ? 'is-active' : ''}>
                      <Link to={{search: '?tab='+d.code}}>
                        {d.label}
                      </Link>
                    </li>
                );
            })}
          </ul>
        </div>
    );
}

export default TabsRoot;
