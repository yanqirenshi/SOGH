import React, { useState } from 'react';
import Masonry from 'react-masonry-component';
import ProductBacklog from './ProductBacklog.js';

const masonryOptions = {
    transitionDuration: 0,
    gutter: 22,
    columnWidth: 111,
    itemSelector: '.product-backlog'
};

function buildBacklog (d, sogh, callbacks) {
    return <ProductBacklog key={d.id}
                           project={d}
                           sogh={sogh}
                           callbacks={callbacks} />;
}

export default function Pool (props) {
    const [layouted_at, setLayoutedAt] = useState(null);

    const sogh = props.sogh;

    const callbacks = {
        layout: (dt) => setLayoutedAt(dt),
    };

    return (
        <div style={{width:props.w, marginLeft: 'auto', marginRight: 'auto' }}
             layouted_at={layouted_at}>
          <Masonry options={masonryOptions}>
            {props.projects.map(d => buildBacklog(d, sogh, callbacks))}
          </Masonry>
        </div>
    );
}
