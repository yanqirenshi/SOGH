import React from 'react';

const style = {
    width: '100%',
    padding: 8,
    contents: {
        background: '#fafafa',
        padding: '11px 22px',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
    }
}

export default function MilestoneIssuesEmpty (props) {
    return (
        <div style={style}>
          <div style={style.contents}>
            <p>イシューは ZERO件 です。</p>
          </div>
        </div>
    );
}
