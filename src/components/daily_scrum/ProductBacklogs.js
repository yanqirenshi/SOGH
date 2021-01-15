import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function ProductBacklogs (props) {
    const [search, setSearch] = useState('');

    const change = (e) => setSearch(e.target.value.toUpperCase());

    const project_searched = props.projects.list.reduce((list, d) => {
        if (d.name.toUpperCase().indexOf(search)!==-1)
            list.push(d);

        return list;
    }, []);

    return (
        <nav className="panel">
          <p className="panel-heading" style={{fontSize:14}}>
            Product backlog
          </p>

          <div className="panel-block">
            <p className="control has-icons-left">
              <input className="input"
                     type="text"
                     placeholder="Search"
                     onChange={change} />

              <span className="icon is-left">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </p>
          </div>

          {project_searched.sort((a,b)=>a.name<b.name?-1:1).map(d => {
              return <div key={d.id} className="panel-block"
                          style={{fontSize:14}} >
                       <p>{d.name}</p>
                     </div>;
          })}
        </nav>
    );
}
