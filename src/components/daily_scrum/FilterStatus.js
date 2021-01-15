import React from 'react';

export default function FilterStatus (props) {
    const style = {
        ...props.style,
        ...{
            padding: 11,
            height: 46,
            marginBottom: 0,
        },
    };

    const clickItem = (e) => {
        props.callbacks.filter.click('status', e.target.getAttribute('data_id'));
    };

    if (!props.filter[props.status.title]) {
        style.boxShadow = 'none';
        style.border = '1px solid #eeee';
    }

    const title = props.status.title;
    return (
        <div className="box"
             style={style}
             data_id={title}
             onClick={clickItem}>

          <div className="contents"
               data_id={title}>
            <p data_id={title}>
              {title}
            </p>
          </div>
        </div>
    );

}
