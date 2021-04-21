import React from 'react';

import HeroHead from './HeroHead.js';
import HeroBody from './HeroBody.js';
import HeroFoot from './HeroFoot.js';

import './Style.css';


export default function Hero (props) {
    const sogh = props.sogh;
    const project = props.project;

    const style = sogh.headerColor(project);

    return (
        <section className="hero is-large sogh-product-backlog-hero"
                 style={{background: style.background}}>

          <HeroHead root_url={props.root_url}/>

          <HeroBody sogh={props.sogh} project={props.project}/>

          <HeroFoot tabs={props.tabs}
                    selected_tab={props.selected_tab} />
        </section>
    );
}
