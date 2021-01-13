import React from 'react';

export default function Sprint (props) {
    const cols = { w: 4, h: 1};
    const size = 111;

    return (
        <div className="box"
             style={{width: cols.w*size, height: cols.h*size}}>
          <h1 className="title is-5">Sprint</h1>

          <div className="contents">
            <p>【スプリント】2021-01-13 〜 2021-01-18</p>
          </div>
        </div>
    );

}
