import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

export default function ButtonRefresh (props) {
    const click = (e) => props.callbacks.refresh();

    return (
        <button className="button is-small"
                onClick={click}>

          <FontAwesomeIcon type="table"
                           icon={faSyncAlt} />

        </button>
    );
}
