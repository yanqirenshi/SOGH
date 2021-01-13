import React from 'react';

import Developers      from './Developers.js';

export default function Members (props) {
    return (
        <div style={{display:'flex', flexWrap: 'wrap'}}>
          <Developers/>
          <Developers/>
          <Developers/>
        </div>
    );
}
