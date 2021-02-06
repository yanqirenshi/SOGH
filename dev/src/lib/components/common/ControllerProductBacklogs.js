import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

export default function ControllerProductBacklogs (props) {
    return (
        <div style={{padding:'0px 11px', display: 'flex'}}>
          <div>
            <button className="button is-small"
                    onClick={props.callbacks.refresh}>
              <FontAwesomeIcon type="table"icon={faSyncAlt} />
            </button>
          </div>

          <div style={{marginLeft:11}}>
            <button className="button is-small"
                    onClick={props.callbacks.clickOpenAllProductBacklogs}
                    title="Open All Product Backlogs">
              Open All
            </button>

            <button className="button is-small"
                    onClick={props.callbacks.clickCloseAllProductBacklogs}
                    title="Close All Product Backlogs">
              Close All
            </button>
          </div>
        </div>
    );
}
