import React from 'react';

import DescriptionText from './DescriptionText.js';
import DescriptionFields from './DescriptionFields.js';

const style = {
    display:'flex',
    flexDirection: 'column',
    height: '100%',
};

export default function Description (props) {
    const data = props.source;
    const callback = props.callback;

    return (
        <div style={style}>
          <div style={{flexGrow:1}}>
            <DescriptionText data={data} callback={callback} />
          </div>

          <div>
            <DescriptionFields data={data} callback={callback} />
          </div>
        </div>
    );
}
