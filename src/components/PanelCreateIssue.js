import React, { useState } from 'react';

import Title from './panel_create_issue/Title.js';
import Description from './panel_create_issue/Description.js';
import Relationship from './panel_create_issue/Relationship.js';
import Finder from './panel_create_issue/Finder.js';

const style = {
    width: 888,
    height: 666,
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
        }
    },
    selector: {
        display:'flex',
        height: 333,
        col: {
            width: '25%',
            padding: 5,
        }
    },
};

function r (title, contents, callbacks) {
    console.log('d4----------------');
    console.log([title, contents, callbacks]);
    return (
        <div style={style.relationships.col}>
          <Relationship title={title}
                        callbacks={callbacks}
                        contents={contents}/>
        </div>
    );
}

function c (type, contents, callbacks) {
    console.log('d5----------------');
    console.log([type, contents, callbacks]);
    return (
        <div style={style.selector.col}>
          <Finder type={type}
                  contents={contents}
                  callbacks={callbacks}/>
        </div>
    );
}

export default function PanelCreateIssue (props) {
    console.log('d1----------------');
    console.log(props);
    const [selector, setSelector] = useState(false);

    const data = props.data;
    const active = props.sogh.active();

    console.log('d2----------------');

    const callbacks = {
        ...{
            selector: {
                swith: () => setSelector(!selector),
            }
        },
        ...(props.callbacks || {})
    };

    console.log('d3----------------');

    return (
        <div style={style}>
          <div style={style.relationships}>
            {r("Projects",  data.projects,  callbacks)}
            {r("Milestone", data.milestone, callbacks)}
            {r("Labels",    data.labels,    callbacks)}
            {r("Assignees", data.assignees, callbacks)}
          </div>

          {selector &&
           <div style={style.selector}>
             {c('projects',   active.projects,   callbacks)}
             {c('milestone',  active.milestones, callbacks)}
             {c('labels',     active.labels,     callbacks)}
             {c('assignees',  active.assignees,  callbacks)}
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
