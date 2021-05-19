import React from 'react';
import moment from 'moment';
import {LinkBlank} from './Links.js';

function dt (v) {
    if (!v) return '';

    return moment(v).format('MM-DD');
}

const style = {
    nowrap: {
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
    right: {
        textAlign: 'right',
    },
};

function color (hexcolor) {
    var r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
    var g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
    var b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

    return ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;
};

function labelStyle (d) {
    const background = '#' + d.color;
    return {
        color: color(background),
        background: background,
        whiteSpace: 'nowrap',
        padding: ' 2px 4px',
        borderRadius: 5,
        display: 'inline-block',
        marginRight: '.25em',
        marginBottom: '.25em',
        fontSize: 12,
    };
}

function diff (plan, result) {
    return plan - result;
}

function prjColumn (issue) {
    return issue.projectCards.nodes.map(d=>{
        return <p key={d.column.id}>
                 {d.column.name}
               </p>;
    });
}

function due (v) {
    if (!v)
        return '';

    const m = moment(v);

    if (!m.isValid())
        return '';

    return m.format('MM-DD ddd');
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

function prjName (issue) {
    return issue.project.name || '';
}

function prjPri (sogh, issue) {
    return sogh.priorityLabel(issue.project.priority);
}

function makeTrs (sogh, issue) {
    return <tr key={issue.id}>
             <td style={sogh.headerColor(issue.project)}>
               {prjPri(sogh, issue)}
             </td>
             <td>{prjNum(issue)}</td>
             <td>{prjName(issue)}</td>
             <td style={style.nowrap}>
               {prjColumn(issue)}
             </td>
             <td style={style.right}>
               <LinkBlank href={issue.url}>
                 {issue.number}
               </LinkBlank>
             </td>
             <td>{issue.title}</td>
             <td>{issue.labels.nodes.map(l => {
                 const label_style = labelStyle(l);
                 return <p key={l.id}
                           style={label_style}>
                          <LinkBlank href={l.url}>
                            {l.name}
                          </LinkBlank>
                        </p>;
             })}</td>
             <td style={style.nowrap}>
               {issue.assignees.nodes.map(a => {
                   return <p key={issue.id+'.'+a.id}>
                            {a.name || a.login}
                          </p>;
               })}
             </td>
             <td style={style.nowrap}>
               {due(issue.due_date)}
             </td>
             <td style={style.right}>{issue.point.plan}</td>
             <td style={style.right}>{issue.point.result}</td>
             <td style={style.right}>
               {diff(issue.point.plan, issue.point.result)}
             </td>
             {/* <td style={style.nowrap}>{dt(issue.createdAt)}</td> */}
             <td style={style.nowrap}>{dt(issue.updatedAt)}</td>
             <td style={style.nowrap}>{dt(issue.closedAt)}</td>
           </tr>;
}

export default function TableIssues (props) {
    const sogh = props.sogh;
    const issues = props.issues;

    return (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th colSpan="4">Product Backlog</th>
              <th colSpan="5">Sprint Backlog</th>
              <th colSpan="3">Point</th>
              {/* <th>Create</th> */}
              <th>Update</th>
              <th>Close</th>
            </tr>
            <tr>
              <th>優</th>
              <th>Num</th>
              <th>Name</th>
              <th>Col</th>
              <th rowSpan="2">#</th>
              <th rowSpan="2">Title</th>
              <th rowSpan="2">Labels</th>
              <th rowSpan="2">Assignees</th>
              <th rowSpan="2">Due Date</th>
              <th>Plan</th>
              <th>Result</th>
              <th>Diff</th>
              {/* <th>At</th> */}
              <th>At</th>
              <th>At</th>
            </tr>
          </thead>

          <tbody>
            {issues.map(d => makeTrs(sogh, d))}
          </tbody>
        </table>
    );
}
