import React from 'react';

import GrobalOperator from './GrobalOperator.js';

function GrobalOperators (props) {
    const root = {
        position: 'fixed',
        right: 22,
        bottom: 22,
    };

    return (
        <div style={root}>
          <GrobalOperator />
        </div>
    );
}

export default GrobalOperators;
