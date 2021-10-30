import React from 'react';
import { Link } from "react-router-dom";

import './Style.css';

export default function Foot (props) {
    return (
        <div className="hero-foot">
          <nav className="tabs is-boxed is-centered">
            <div className="container">
              <ul>
                {props.tabs.map(d => {
                    return (
                        <li key={d.code}
                            className={d.code===props.selected_tab.code ? 'is-active' : ''}>
                          <Link to={{search: "?tab="+d.code}}>
                            {d.label}
                          </Link>
                        </li>
                    );
                })}
              </ul>
            </div>
          </nav>
        </div>
    );
}
