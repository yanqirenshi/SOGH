import React from 'react';

export default function OperatorOpenClose (props) {
    const callbacks = props.callbacks;

    const clickOpenAll = () => callbacks.open('all');
    const clickCloseAll = () => callbacks.close('all');

    return (
        <div style={{padding: 22, paddingTop: 0}}>
          <button className="button is-small"
                  style={{marginRight:11}}
                  onClick={clickCloseAll}>
            Close All
          </button>
          <button className="button is-small"
                  onClick={clickOpenAll}>
            Open All
          </button>
        </div>
    );
}
