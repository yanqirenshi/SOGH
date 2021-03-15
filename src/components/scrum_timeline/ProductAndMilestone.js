import React from 'react';

import Product         from './Product.js';
import Sprint          from './Sprint.js';

export default function ProductAndMilestone (props) {
    return (
        <div style={{display:'flex', alignItems: 'center', marginBottom: 22}}>

          {props.repository &&
           <div style={{marginRight:22}}>
             <Product repository={props.repository} />
           </div>}

          {props.milestone &&
           <div>
             <Sprint milestone={props.milestone}/>
           </div>}

        </div>
    );
}
