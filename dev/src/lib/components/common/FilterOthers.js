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

    if (!props.filter[props.other.key]) {
        style.boxShadow = 'none';
        style.border = '1px solid #eeee';
    }

    const title = props.other.title;
    const key = props.other.key;
    return (
        <div className="box"
             style={style}
             data_id={key}
             onClick={clickItem}>

          <div className="contents" data_id={key}>
            <p data_id={key} style={{marginTop: -2}}>
              {title}
            </p>
          </div>
        </div>
    );
}
