import React from 'react';

import Column from './Column.js';

function sort (columns) {
    const purposes = columns.reduce((ht, d) => {
        const purpose = d.purpose;

        if (!ht[purpose])
            ht[purpose] = [];

        ht[purpose].push(d);

        return ht;
    }, {});

    return [ 'TODO', 'IN_PROGRESS', null, 'DONE' ].reduce((out, p) => {
        if (!purposes[p]) return out;

        return out.concat(purposes[p].sort((a,b) => a.id<b.id ? -1 : 1));
    }, []);
}

export default function Columns (props) {
    const columns = props.columns;
    const project = props.project;

    return (
        <section className="section">
          <div className="container">
            {sort(columns).map(d => <Column key={d.id}
                                            source={d}
                                            project={project} />)}
          </div>
        </section>
    );
}
