import React from 'react';

import TitleSection from './TitleSection.js';

function makeItem (d, change) {
    return (
        <div key={d.id} style={{display: 'flex'}}>
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
        </div>
    );
}

export default function Milestones (props) {
    const filter = props.filter;
    const callbaks = props.callbaks.filter;

    const change = (e) => callbaks.change(e.target.value, e.target.checked);
    const clearAll = () => callbaks.clearAll('milestones');
    const checkAll = () => callbaks.checkAll('milestones');

    return (
        <div>
          <TitleSection label="Milestones" />

          <div style={{marginLeft:11}}>
            {filter.milestones.list.map(d => makeItem(d, change))}


            <div style={{marginTop:3}}>
              <button className="button is-small" onClick={checkAll}>
                Check All
              </button>

              <button className="button is-small" onClick={clearAll}>
                Clear All
              </button>
            </div>
          </div>
        </div>
    );
}
