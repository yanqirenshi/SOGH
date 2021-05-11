import React from 'react';

export default function FilterOthers (props) {
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
        props.callbacks.filter.click('others', e.target.getAttribute('data_id'));
    };

    const selected = !props.filter[props.other.key];

    const title = props.other.title;
    const key = props.other.key;
    return (
        <button className={ "button is-small " + (selected ? '' : 'is-info')}
                style={style}
             data_id={key}
             onClick={clickItem}>
              {title}
        </button>
    );
}
