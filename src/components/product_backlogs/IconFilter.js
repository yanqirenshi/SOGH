import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const style = {
    fontSize: 14,
    paddingTop: 4,
    marginRight: 11,
    color: '#888',
}

export default function IconFilter (props) {

    return (
        <div style={style}>
          <FontAwesomeIcon icon={faFilter} />
        </div>
    );
}
