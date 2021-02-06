import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function isChecked (project, filter) {
    return filter.projects().find(id=>id===project.id) ? false : true;
};

export default function ListProductBacklogs (props) {
    const [search, setSearch] = useState('');

    const change = (e) => setSearch(e.target.value.toUpperCase());

    const project_searched = props.projects.reduce((list, d) => {
        const name = d.name || '';

        if (name.toUpperCase().indexOf(search)!==-1)
            list.push(d);

        return list;
    }, []);

    const clickProject = (e) => {};
    const clickClearAll = () => props.callbacks.list_pb.cleaAll();
    const clickCheckAll = () => props.callbacks.list_pb.checkAll();
    const clickProjectCheckbox = (e) => {
        props.callbacks.filter.click('project', e.target.getAttribute('project_id'));
    };

    return (
        <nav className="panel">
          <p className="panel-heading" style={{fontSize:14}}>
            Product backlog
          </p>

          <div className="panel-block">
            <p className="control has-icons-left">
              <input className="input is-small"
                     type="text"
                     placeholder="Search"
                     onChange={change} />

              <span className="icon is-left">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </p>
          </div>

          <div className="panel-block">
            <button className="button is-small is-fullwidth"
                    onClick={clickClearAll}>
              Clear All
            </button>
            <button className="button is-small is-fullwidth"
                    onClick={clickCheckAll}>
              Check All
            </button>
          </div>

          {project_searched.map(d => {
              return <div key={d.id} className="panel-block"
                          style={{fontSize:14}}
                          onClick={clickProject}>
                       <p>
                         <input type="checkbox"
                                project_id={d.id}
                                checked={isChecked(d, props.filter)}
                                onChange={clickProjectCheckbox}/>
                       </p>
                       <p>
                         {d.name}
                       </p>
                     </div>;
          })}
        </nav>
    );
}
