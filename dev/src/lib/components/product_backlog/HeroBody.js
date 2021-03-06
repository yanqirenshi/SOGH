import React from 'react';

import './Style.css';

export default function HeroBody (props) {
    const sogh = props.sogh;
    const project = props.project;

    const style = sogh.headerColor(project);

    return (
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
    );
}
