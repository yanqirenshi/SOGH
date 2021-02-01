import React, { useState } from 'react';
import Measure from "react-measure";

import Pool from './cards/Pool.js';

export default function Cards (props) {
    const sogh = props.sogh;

    const [size, setSize] = useState({
        width: 0,
        height: 0
    });

    const filterd_projects = props.projects;

    return (
        <Measure bounds onResize={(contentRect) => { setSize({ ...contentRect.bounds }); }}>
          {({ measureRef }) => {
              const w = Math.floor(size.width / (111+22)) * (111+22);
              return <div ref={measureRef} className="grid-inner">
                       <Pool projects={filterd_projects} w={w} sogh={sogh} />
                     </div>;
          }}
        </Measure>
    );
}
