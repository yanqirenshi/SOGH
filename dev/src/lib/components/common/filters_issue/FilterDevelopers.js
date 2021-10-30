import React from 'react';

function dataID (e) {
    return e.target.getAttribute('data_id');
}

export default function FilterDevelopers (props) {
    const style = {
        ...{
            padding: 8,
            height: 30,
            marginBottom: 0,
            fontSize: 12,
        },
        ...props.style,
    };

    const clickItem = (e) => props.callbacks.filter.click('assignee', dataID(e));

    const selected = props.filter.indexOf(props.assignee.id)>-1;

    return (
        <button className={ "button is-small " + (selected ? '' : 'is-info')}
                style={style}
                data_id={props.assignee.id}
                onClick={clickItem}>
          {(props.assignee.name || props.assignee.login).trim()}
        </button>
    );

}
