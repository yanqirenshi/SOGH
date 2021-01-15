import React from 'react';

export default function Product (props) {
    const cols = { w: 3, h: 1};
    const size = 111;

    return (
        <div className="box"
             style={{width: cols.w*size, height: cols.h*size}}>
          <h1 className="title is-5">Product</h1>

          <div className="contents">
            <p>{props.repository.owner} / {props.repository.name}</p>
          </div>
        </div>
    );
}
