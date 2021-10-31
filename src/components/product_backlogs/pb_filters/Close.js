import React from 'react';
import Switch from "react-switch";

const style = {
    marginLeft: 22,
    display: 'flex',
    marginTop: -4,
    label: {
        marginRight: 3,
        marginTop: -4,
    },
};

export default function Close (props) {
    const filter = props.filter;
    const callbacks = props.callbacks;

    const handleChange  = (checked)=> callbacks.ommitClose(checked);

    return (
        <div style={style}>
          <div style={style.label}>
            Close は除外:
          </div>

          <div>
            <Switch height={20}
                    width={48}
                    onChange={handleChange}
                    checked={filter.ommit_close} />
          </div>
        </div>
    );
}
