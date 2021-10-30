import React from 'react';

import Column from './Column.js';

export default function Columns (props) {
    const columns = props.columns.filter(d => d.issues.length!==0);
    const project = props.project;
    const filter  = props.filter;

    const columns_sorted = props.core.sortColumns(columns);

    return (
        <section className="section" style={props.style}>
          <div className="container">
            {columns_sorted.map(d => <Column key={d.id}
                                             source={d}
                                             project={project}
                                             filter={filter} />)}
          </div>
        </section>
    );
}
