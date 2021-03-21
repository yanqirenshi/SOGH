import React from 'react';

import CardIssueClose from '../CardIssueClose.js';
import TitleSection from './TitleSection.js';

const style = {
    root: {
        width: 200,
        height: 'auto',
        marginBottom: 20,
    },
};

export default function Repository (props) {
    const filter = props.filter;
    const callbaks = props.callbaks;

    const change = (e) => callbaks.filter.change(e.target.value, e.target.checked);

    return (
        <div style={{width:420}}
             className="sogh-card-item box">

          <div>
            <TitleSection label="Milestones" />
            {filter.milestones.list.map(d => {
                return <div key={d.id} style={{display: 'flex'}}>
                         <div>
                           <input type="checkbox"
                                  defaultValue={d.id}
                                  checked={d.active}
                                  onChange={change} />
                         </div>

                         <div style={{marginLeft:8, fontSize:14}}>
                           <a href={d.url} target="_blank" rel="noreferrer">
                             <p style={{color: '#333'}}>
                               {d.title}
                             </p>
                           </a>
                         </div>
                       </div>;
            })}
          </div>

          <div>
            <TitleSection label="Projects" />
            {filter.projects.list.map(d => {
                return <div key={d.id} style={{display: 'flex'}}>
                         <div>
                           <input type="checkbox"
                                  defaultValue={d.id}
                                  checked={d.active}
                                  onChange={change} />
                         </div>

                         <div style={{marginLeft:8, fontSize:14}}>
                           <a href={d.url} target="_blank" rel="noreferrer">
                             <p style={{color: '#333'}}>
                               {d.name}
                             </p>
                           </a>
                         </div>
                       </div>;
            })}
          </div>


        </div>
    );
}
