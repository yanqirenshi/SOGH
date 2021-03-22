import React from 'react';

const style = {
    marginBottom: 3,
    marginTop: 6,
};

export default function TitleSection (props) {
    return (
        <h1 className="title is-5" style={style}>
          {props.label}
        </h1>
    );
}
