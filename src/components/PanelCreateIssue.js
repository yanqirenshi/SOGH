import React, { useState } from 'react';

import Title from './panel_create_issue/Title.js';
import Description from './panel_create_issue/Description.js';
import Relationship from './panel_create_issue/Relationship.js';
import Finder from './panel_create_issue/Finder.js';
import {LinkBlankGithub} from './common/Links.js';

const style = {
    width: 888,
    height: 555,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    body: {
        flexGrow:1,
        padding: 5,
    },
    controller: {
        padding: 11,
    },
    relationships: {
        display:'flex',
        col: {
            width: '25%',
            padding: 5,
            paddingTop: 0,
            paddingBottom: 0,
        }
    },
    selector: {
        height: 333,
        marginBottom: 11,
        col: {
            width: '25%',
            padding: 5,
            paddingTop: 0,
            paddingBottom: 0,
        }
    },
};

function r (title, contents, selector, callbacks) {
    return (
        <div style={style.relationships.col}>
          <Relationship title={title}
                        is_opened={selector}
                        contents={contents}
                        callbacks={callbacks}/>
        </div>
    );
}

function finder (type, contents, selected, callbacks) {
    return (
        <div style={style.selector.col}>
          <Finder type={type}
                  contents={contents}
                  selected={selected}
                  callbacks={callbacks}/>
        </div>
    );
}

function setSingle (type, v, data) {
    const new_data = {...data};

    new_data[type] = v;

    return new_data;
}

function switchSingle (type, v, data) {
    const new_data = {...data};

    if (!new_data[type] || new_data[type].id!==v.id)
        new_data[type] = v;
    else
        new_data[type] = null;

    return new_data;
}

function switchMulti (type, v, data) {
    const new_data = {...data};

    if (new_data[type].find(d=>d.id===v.id))
        new_data[type] = new_data[type].filter(d=>d.id!==v.id);
    else
        new_data[type].push(v);

    return new_data;
}

export default function PanelCreateIssue (props) {
    const [selector, setSelector] = useState(false);

    const data = props.data;
    const active = props.sogh.active();
    const change = props.callback || (() => {});

    const callbacks = {
        ...{
            selector: {
                swith: () => setSelector(!selector),
            }
        },
        change: {
            title:       (v) => change(setSingle('title', v, data)),
            description: (v) => change(setSingle('description', v, data)),
            projects:    (v) => change(switchMulti('projects', v, data)),
            milestone:   (v) => change(switchSingle('milestone', v, data)),
            labels:      (v) => change(switchMulti('labels', v, data)),
            assignees:   (v) => change(switchMulti('assignees',v, data)),
        },
    };

    return (
        <div style={{...style, ...(props.style || {})}}>
          {data.repository
           && <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginBottom:11}}>
                <h1 className="title is-5" style={{marginBottom:0}}>
                  {data.repository.name}
                </h1>
                <p style={{marginLeft:11}}>
                  <LinkBlankGithub href="{data.repository.url}"/>
                </p>
              </div>}

          <div style={style.relationships}>
            {r("Projects",  data.projects,  selector, callbacks)}
            {r("Milestone", data.milestone, selector, callbacks)}
            {r("Labels",    data.labels,    selector, callbacks)}
            {r("Assignees", data.assignees, selector, callbacks)}
          </div>

          {selector &&
           <div style={style.selector}>
             <div style={{display:'flex', height: '100%'}}>
               <div style={{flexGrow: 1, display:'flex'}}>
                 {finder('projects',   active.projects,   data.projects,  callbacks)}
                 {finder('milestone',  active.milestones, data.milestone, callbacks)}
                 {finder('labels',     active.labels,     data.labels,    callbacks)}
                 {finder('assignees',  active.assignees,  data.assignees, callbacks)}
               </div>
             </div>
             {/* <div style={{textAlign: 'right', paddingTop:11}}> */}
             {/*   <button className="button is-small is-warning" */}
             {/*           onClick={callbacks.selector.swith}> */}
             {/*     Close */}
             {/*   </button> */}
             {/* </div> */}
           </div>}


          <div style={{marginBottom:5,marginTop:11}}>
            <Title contents={data.description}
                   callbacks={callbacks}/>
          </div>

          <div style={style.body}>
            <Description contents={data.description}
                         callbacks={callbacks} />
          </div>
        </div>
    );
}
