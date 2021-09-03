import React, { useState } from 'react';

import {Label} from '../../../js/models/index.js';

export default function Labels (props) {
    const [label] = useState(new Label());

    const labels = props.issue.labels.nodes;

    if (labels.length===0)
        return null;

    return labels.map(d => {
        const style = {
            fontSize:12,
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
            color: label.color('#' + d.color),
            background: '#' + d.color,
            padding: '1px 4px',
            borderRadius: 3,
        };

        return (
            <a  key={d.id} href={d.url} target="_blank" rel="noreferrer">
              <div style={style}>
                {d.name}
              </div>
            </a>
        );
    });
}
