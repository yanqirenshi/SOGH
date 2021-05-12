import React, { useState } from 'react';

import Title from './panel_create_issue/Title.js';
import Description from './panel_create_issue/Description.js';
import Relationship from './panel_create_issue/Relationship.js';
import Finder from './panel_create_issue/Finder.js';

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
        display:'flex',
        height: 333,
        col: {
            width: '25%',
            padding: 5,
            paddingTop: 0,
            paddingBottom: 0,
        }
    },
};

function r (title, contents, callbacks) {
    return (
        <div style={style.relationships.col}>
          <Relationship title={title}
                        callbacks={callbacks}
                        contents={contents}/>
        </div>
    );
}

function finder (type, contents, callbacks) {
    return (
        <div style={style.selector.col}>
          <Finder type={type}
                  contents={contents}
                  callbacks={callbacks}/>
        </div>
    );
}

export default function PanelCreateIssue (props) {
    const [selector, setSelector] = useState(false);

    const data = props.data;
    const active = props.sogh.active();

    const callbacks = {
        ...{
            selector: {
                swith: () => setSelector(!selector),
            }
        },
        ...(props.callbacks || {})
    };

    return (
        <div style={{...style, ...(props.style || {})}}>
          <div style={style.relationships}>
            {r("Projects",  data.projects,  callbacks)}
            {r("Milestone", data.milestone, callbacks)}
            {r("Labels",    data.labels,    callbacks)}
            {r("Assignees", data.assignees, callbacks)}
          </div>

          {selector &&
           <div style={style.selector}>
             {finder('projects',   active.projects,   callbacks)}
             {finder('milestone',  active.milestones, callbacks)}
             {finder('labels',     active.labels,     callbacks)}
             {finder('assignees',  active.assignees,  callbacks)}
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
