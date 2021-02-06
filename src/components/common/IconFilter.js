import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const style = {
    fontSize: 18,
    paddingTop: 2,
    marginRight: 22,
    marginLeft: 7,
    color: '#888'
};

export default function IconFilter (props) {
    return (
        <div style={style}>
          <FontAwesomeIcon style={{}} icon={faFilter} />
        </div>
    );
}
