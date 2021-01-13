import React from 'react';

export default function ProductBacklogs (props) {
    return (
        <nav className="panel">
          <p className="panel-heading" style={{fontSize:14}}>
            Product backlog
          </p>

          {/* <div className="panel-block"> */}
          {/*   <p className="control has-icons-left"> */}
          {/*     <input className="input" type="text" placeholder="Search" /> */}
          {/*     <span className="icon is-left"> */}
          {/*       <i className="fas fa-search" aria-hidden="true"></i> */}
          {/*     </span> */}
          {/*   </p> */}
          {/* </div> */}

          <div className="panel-block">
            <p>XXX</p>
          </div>

          <div className="panel-block">
            <p>YYY</p>
          </div>

          <div className="panel-block">
            <p>ZZZ</p>
          </div>

          <div className="panel-block">
            <p>HHH</p>
          </div>
        </nav>
    );
}
