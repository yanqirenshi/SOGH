import React from 'react';

export default function Developer (props) {
    const cols = { w: 2, h: 1};
    const size = 111;

    return (
        <div className="box"
             style={{width: cols.w*size, height: cols.h*size}}>
          <h1 className="title is-5">Developer</h1>

          <div className="contents">
            <p>???</p>
          </div>
        </div>
    );

}
