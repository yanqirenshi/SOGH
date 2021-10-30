import React from 'react';

import Head from './hero_product_backlog/Head.js';
import Body from './hero_product_backlog/Body.js';
import Foot from './hero_product_backlog/Foot.js';

import './hero_product_backlog/Style.css';

export default function HeroProductBacklog (props) {
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

          <Head root_url={root_url}/>

          <Body sogh={sogh} project={project}/>

          <Foot tabs={tabs} selected_tab={selected_tab}/>

        </section>
    );
}
