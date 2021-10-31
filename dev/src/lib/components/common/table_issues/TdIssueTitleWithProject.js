import React from 'react';
import { Link } from "react-router-dom";
import {LinkBlank} from '../Links.js';

import Labels from '../Labels.js';

function prjColumn (issue) {
    return issue.projectCards().map((d,i)=>{
        if (!d.column)
            return null;

        return (
            <p key={d.column.id}>
              {d.column.name}
            </p>
        );
    });
}

function prjNum (issue) {
    const project = issue.project;

    if (!project.id())
        return '';

    return (
        <LinkBlank href={project.url()}>
          {project.number()}
        </LinkBlank>
    );
}

function prjName (issue, productbacklog_url_prefix) {
    const style = {
        normal: {
            color: 'inherit',
            textDecoration: 'underline',
            textUnderlineOffset: 2,
            textDecorationColor: '#ddd',
            textDecorationStyle: 'dotted',
        },
    };

    const project = issue.project;

    if (!project)
        return null;

    return (
        <Link style={style.normal}
              to={productbacklog_url_prefix + project.id()}>
          {project.name() || ''}
        </Link>
    );
}

export default function TdIssueTitleWithProject (props) {
    const issue = props.issue;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    return (
        <td>
          {issue.project.id() &&
           <div style={{display:'flex', fontSize:12}}>
             <div style={{marginRight:11}}>
               {prjColumn(issue)}
             </div>

             <div>
               {prjName(issue, productbacklog_url_prefix)} ({prjNum(issue)})
             </div>
           </div>}

          <p style={{fontWeight:'bold', fontSize:14}}>
            {issue.title()}
          </p>

          <div style={{marginTop:3, textAlign:'right'}}>
            <Labels issue={issue} split={10}/>
          </div>
        </td>
    );
}
