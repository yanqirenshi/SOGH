import React from 'react';

export default function Sprint (props) {
    return (
        <div style={{fontSize: 22, fontWeight: 'bold'}}>
          <h1 className="title">{props.milestone.title}</h1>
        </div>
    );
}
