import React from 'react';

import ButtonToggle from '../../common/ButtonToggle.js';

const style = {
    display: 'flex',
    label: {
        minWidth:88,
        maxWidth:88,
        marginRight: 11,
        textAlign:'right',
    },
    contents: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

function label (type) {
    const lables = {
        priorities: 'Priority',
        types: 'Type',
        assignees: 'Assignee',
    };

    return lables[type] || '????????';
}

function allVal (filters) {
    return filters.reduce((out,d)=>{
        out[d.code]=true;
        return out;
    },{});
}

export default function Attributes (props) {
    const type = props.type;

    const sogh = props.sogh;
    const filter = props.filter[type];
    const filters = props.filters[type];
    const callback = props.callback;
    const callbacks = props.callbacks;

    const makeLabelString = (d) => {
        if ('priorities'===d.type)
            return sogh.priorityLabel(d.value) + ` (${d.count})`;

        if ('types'===d.type || 'assignees'===d.type)
            return d.value + ` (${d.count})`;

        return '???';
    };

    const checkAll = ()=> callbacks.setAllAttrs(type, {});
    const clearAll = ()=> callbacks.setAllAttrs(type, allVal(filters));

    return (
        <div style={style}>
          <div style={style.label}>
            {label(type)}
          </div>

          <div style={style.contents}>
            <button className="button is-small"
                    style={{marginRight:3}}
                    onClick={checkAll}>
              Check All
            </button>

            <button className="button is-small"
                    style={{marginRight:3}}
                    onClick={clearAll}>
              Clear All
            </button>

            {filters.map(d => {
                const label = makeLabelString(d);

                return <ButtonToggle key={d.code}
                                     style={{marginBottom:3, marginRight:3}}
                                     code={d.code}
                                     label={label}
                                     on={filter[d.code]}
                                     callback={callback} />;
            })}

          </div>
        </div>
    );
}
