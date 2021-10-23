import React from 'react';

export default function Product (props) {
    const repository = props.repository;

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h1 className="title is-5">
            {repository.owner().login} / {repository.name()}
          </h1>
        </div>
    );
}
