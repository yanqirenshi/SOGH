import React from 'react';

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
                <div className="navbar-start">
                  <div className="navbar-end"
                       style={{paddingTop: 8}}>
                    {props.root_url &&
                     <a href={props.root_url.to}
                        target="_blank" rel="noreferrer">
                       {props.root_url.label}
                     </a>}
                  </div>
                </div>

                {/* <div className="navbar-brand"> */}
                {/*   <a href={props.root_url.to} */}
                {/*      target="_blank" rel="noreferrer"> */}
                {/*     {props.root_url.label} */}
                {/*   </a> */}
                {/* </div> */}

                <div className="navbar-menu">
                  <div className="navbar-end">
                    {/* <a className="navbar-item is-active"> */}
                    {/*   <a href={project && project.url} target="_blank" rel="noreferrer"> */}
                    {/*     Github */}
                    {/*   </a> */}
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="hero-body" style={{paddingTop: 33, paddingBottom: 88}}>
            <div className="container has-text-centered">
              <p className="title" style={{color: style.color}}>
                {project && project.title}
              </p>
              <p className="subtitle" style={{color: style.color}}>
                {project && project.type}
              </p>
            </div>
          </div>

          <div className="hero-foot">
            <nav className="tabs is-boxed is-fullwidth">
              <div className="container">
                {/* <ul> */}
                {/*   {tabs.map(d => { */}
                {/*       return <li key={d.code} */}
                {/*                  className="is-active"> */}
                {/*                <a>{d.label}</a> */}
                {/*              </li>; */}
                {/*   })} */}
                {/* </ul> */}
              </div>
            </nav>
          </div>
        </section>
    );
}
