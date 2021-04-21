import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faTh } from "@fortawesome/free-solid-svg-icons";

export default function ButtonViewSwitch (props) {
    const click = (e) => {
        const findButton = (element) => {
            if ('BUTTON'===element.tagName)
                return element;
            return findButton(element.parentNode);
        };

        const button = findButton(e.target);

        props.callbacks.view.change(button.getAttribute('type'));
    };

    return (
        <button className="button is-small"
                type={'cards'===props.type ? 'table' : 'cards'}
                onClick={click}>

            {'cards'===props.type &&
             <FontAwesomeIcon type="table"
                              icon={faTable} />}

            {'table'===props.type &&
             <FontAwesomeIcon type="cards"
                              icon={faTh} />}
          </button>
    );
}
