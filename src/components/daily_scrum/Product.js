import React from 'react';

export default function Product (props) {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h1 className="title is-5">
            {props.repository.owner} / {props.repository.name}
          </h1>
        </div>
    );
}
