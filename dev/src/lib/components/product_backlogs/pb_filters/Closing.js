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

export default function Closing (props) {
    const filter = props.filter;
    const callbacks = props.callbacks;

    const handleChange  = (checked)=> callbacks.closing(checked);

    return (
        <div style={style}>
          <div style={style.label}>
            Close 出来そう:
          </div>

          <div>
            <Switch height={20}
                    width={48}
                    onChange={handleChange}
                    checked={filter.closing} />
          </div>
        </div>
    );
}
