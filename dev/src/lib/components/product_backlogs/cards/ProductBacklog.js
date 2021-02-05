import React, { useState, useEffect } from 'react';
import Large from './product_backlog/Large.js' ;
import Medium from './product_backlog/Medium.js';
import Small from './product_backlog/Small.js';

export default function ProductBacklog (props) {
    const [size, setSize] = useState(props.sogh.defaultCardSize(props.project));

    const sogh = props.sogh;

    const project = props.project;

    useEffect(() => {
        props.callbacks.layout(new Date());
    }, [size]);

    const callbacks = {
        toLarge:  () => setSize('large'),
        toMedium: () => setSize('medium'),
        toSmall:  () => setSize('small'),
    };

    return (
        <div className="panel product-backlog"
             style={{width:sogh.calCardSize(size), marginBottom: 22}}>
          {size==='max'    && <Large  project={project} sogh={sogh} callbacks={callbacks}/>}
          {size==='large'  && <Large  project={project} sogh={sogh} callbacks={callbacks}/>}
          {size==='medium' && <Medium project={project} sogh={sogh} callbacks={callbacks}/>}
          {size==='small'  && <Small  project={project} sogh={sogh} callbacks={callbacks}/>}
        </div>
    );
}
