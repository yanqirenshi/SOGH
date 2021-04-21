import React from 'react';
import { Link } from "react-router-dom";

const style = {
    link: {
        background: 'rgba(255,255,255,0.8);',borderRadius: 5,
        padding: '6px 11px',
        marginTop: 11,
    }
};

export default function HeroHead (props) {
    return (
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              {props.root_url &&
               <div style={style.style}>
                 <p>
                   <Link to={props.root_url.to}
                         style={{color: '#333'}}>
                     {props.root_url.label}
                   </Link>
                 </p>
               </div>}
            </div>
          </nav>
        </div>
    );
}
