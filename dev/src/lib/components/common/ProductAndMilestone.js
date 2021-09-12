import React from 'react';

import Product from './Product.js';
import {LinkBlankGithub} from './Links.js';

export default function ProductAndMilestone (props) {
    const milestones = props.milestones;
    const milestone = props.milestone;

    const changed  = (e) => {
        const id = e.target.value;
        const milestone = props.milestones.find(m=>m.id()===id);

        props.callbacks.milestone.change(milestone);
    };

    return (
        <div style={{display:'flex', alignItems: 'center', marginBottom: 22}}>

          {props.repository &&
           <div style={{marginRight:22}}>
             <Product repository={props.repository} />
           </div>}

          {milestones &&
           <div style={{display: 'flex'}}>
             <div className="select">
               <select onChange={changed}>
                 {milestones.map(m => {
                     return (
                         <option key={m.id()} value={m.id()}>
                           {m.title()}
                         </option>
                     );
                 })}
               </select>
             </div>

             {milestone &&
              <div style={{display: 'flex', alignItems: 'center', marginLeft: 11, fontSize:24}}>
                <LinkBlankGithub href={milestone.url()} />
              </div>}
           </div>}
        </div>
    );
}
