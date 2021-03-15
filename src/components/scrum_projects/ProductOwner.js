import React from 'react';

export default function ProductOwner (props) {
    const cols = { w: 2, h: 1};
    const size = 111;

    return (
        <div className="box"
             style={{width: cols.w*size, height: cols.h*size}}>
          <h1 className="title is-5">Product Owner</h1>

          <div className="contents">
            <p>???</p>
          </div>
        </div>
    );

}
