import React from 'react';

import HeroHead from './HeroHead.js';
import HeroBody from './HeroBody.js';
import HeroFoot from './HeroFoot.js';

import './Style.css';

export default function Hero (props) {
    const sogh = props.sogh;
    const project = props.project;
    const root_url = props.root_url;
    const tabs = props.tabs;
    const selected_tab = props.selected_tab;

    if (!project) return null;

    const style = project.colorByPriority();

    return (
        <section className="hero is-large sogh-product-backlog-hero"
                 style={{background: style.background}}>

          <HeroHead root_url={root_url}/>

          <HeroBody sogh={sogh} project={project}/>

          <HeroFoot tabs={tabs} selected_tab={selected_tab}/>

        </section>
    );
}
