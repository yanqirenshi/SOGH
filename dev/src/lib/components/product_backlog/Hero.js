import React from 'react';
import { Link } from "react-router-dom";

import './Style.css';

export default function Hero (props) {
    const sogh = props.sogh;
    const project = props.project;

    const style = sogh.headerColor(project);

    return (
        <section className="hero is-large sogh-product-backlog-hero"
                 style={{background: style.background}}>
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
              </div>
            </nav>
          </div>

          <div className="hero-body" style={{paddingTop: 33, paddingBottom: 88}}>
            <div className="container has-text-centered">
              <p className="title" style={{color: style.color}}>
                {project && project.title}
              </p>
              <p className="subtitle" style={{color: style.color}}>
                <span>
                  {project && project.type}
                </span>
                <span style={{marginLeft:22}}>
                  (
                  <a href={project && project.url} target="_blank" rel="noreferrer">
                    {project && project.number}
                  </a>
                  )
                </span>
              </p>
            </div>
          </div>

          <div className="hero-foot">
            <nav className="tabs is-boxed is-centered">
              <div className="container">
                <ul>
                  {props.tabs.map(d => {
                      return <li key={d.code}
                                 className={d.code===props.selected_tab.code ? 'is-active' : ''}>
                               <Link to={{search: "?tab="+d.code}}>
                                 {d.label}
                               </Link>
                            </li>;
                  })}
                </ul>
              </div>
            </nav>
          </div>
        </section>
    );
}
