import React from 'react';

const style = {
    marginBottom: 8,
    padding: '6px 8px',
    border: '1px solid #eee',
    fontSize: 14,
};

export default function Item (props) {
    const data = props.data;
    const type = props.type;
    const callback = props.callbacks.change[type];

    const click = () => callback && callback(data);

    return (
        <div key={data.id}
             style={style}
             onClick={click}>
          {data.title}
        </div>
    );
}
