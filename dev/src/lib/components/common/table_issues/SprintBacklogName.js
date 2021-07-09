import React from 'react';
import { Link } from "react-router-dom";
import {LinkBlank} from '../Links.js';

function prjColumn (issue) {
    return issue.projectCards.nodes.map((d,i)=>{
        return (
            <p key={d.column.id}>
              {d.column.name}
            </p>
        );
    });
}

function prjNum (issue) {
    const project = issue.project;

    if (!project.id)
        return '';

    return (
        <LinkBlank href={project.url}>
          {project.number}
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

    return (
        <Link style={style.normal}
              to={productbacklog_url_prefix + issue.project.id}>
          {issue.project.name || ''}
        </Link>
    );
}

export default function SprintBacklogName (props) {
    const issue = props.issue;
    const productbacklog_url_prefix = props.productbacklog_url_prefix;

    return (
        <>
          <div style={{display:'flex', fontSize:12}}>
            <div style={{marginRight:11}}>
              {prjColumn(issue)}
            </div>

            <div>
              {prjName(issue, productbacklog_url_prefix)} ({prjNum(issue)})
            </div>
          </div>

          <p style={{fontSize:16}}>
            {issue.title}
          </p>

        </>
    );
}
