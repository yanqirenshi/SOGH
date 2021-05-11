import React from 'react';

export default function FilterStatus (props) {
    const style = {
        ...{
            padding: 8,
            height: 30,
            marginBottom: 0,
            fontSize: 12,
        },
        ...props.style,
    };

    const clickItem = (e) => {
        props.callbacks.filter.click('status', e.target.getAttribute('data_id'));
    };

    const selected = !props.filter[props.status.title];

    const title = props.status.title;
    return (
        <button className={ "button is-small " + (selected ? '' : 'is-info')}
                style={style}
                data_id={title}
                onClick={clickItem}>
              {title}
        </button>
    );

}
