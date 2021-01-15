import React from 'react';

export default function FilterDevelopers (props) {
    const style = {
        ...props.style,
        ...{
            padding: 11,
            height: 46,
            marginBottom: 0,
        },
    };

    const clickItem = (e) => {
        props.callbacks.filter.click('assignee', e.target.getAttribute('data_id'));
    };

    if (props.filter.indexOf(props.assignee.id)!==-1) {
        style.boxShadow = 'none';
        style.border = '1px solid #eeee';
    }

    return (
        <div className="box"
             style={style}
             data_id={props.assignee.id}
             onClick={clickItem}>

          <div className="contents"
               data_id={props.assignee.id}>
            <p data_id={props.assignee.id}>
              {(props.assignee.name || props.assignee.login).trim()}
            </p>
          </div>

        </div>
    );

}
