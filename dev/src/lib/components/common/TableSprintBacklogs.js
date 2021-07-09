import React from 'react';
import moment from 'moment';
import {LinkBlank} from './Links.js';
import Labels from './Labels.js';

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

    return m.format('MM-DD');
}

function makeTrs (issue) {
    const point_result = issue.point.results ? issue.point.results.total : issue.point.result;

    return <tr key={issue.id}>
             <td style={style.right}>
               <LinkBlank href={issue.url}>
                 {issue.number}
               </LinkBlank>
             </td>
             <td style={style.nowrap}>
               {prjColumn(issue)}
             </td>
             <td>
               {issue.title}
             </td>
             <td>
               <Labels issue={issue}/>
             </td>
             <td style={style.nowrap}>
               {issue.owner}
             </td>
             <td style={style.nowrap}>
               {due(issue.due_date)}
             </td>
             <td style={style.nowrap}>
               {issue.assignees.nodes.map(a => {
                   return <span key={issue.id+'.'+a.id}>
                            {a.name || a.login}
                          </span>;
               })}
             </td>
             <td>
               {dt(issue.date_next_action)}
             </td>
             <td style={style.right}>{issue.point.plan}</td>
             <td style={style.right}>
               {point_result}
             </td>
             <td style={style.right}>
               {diff(issue.point.plan, point_result)}
             </td>
             {/* <td style={style.nowrap}>{dt(issue.createdAt)}</td> */}
             {/* <td style={style.nowrap}>{dt(issue.updatedAt)}</td> */}
             <td style={style.nowrap}>{dt(issue.closedAt)}</td>
           </tr>;
}

export default function TableSprintBacklogs (props) {
    const project = props.project;

    return (
        <table className="table is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">Col</th>
              <th rowSpan="2">Title</th>
              <th rowSpan="2">Labels</th>
              <th colSpan="2">Manegement</th>
              <th colSpan="2">Work</th>
              <th colSpan="3">Point</th>
              {/* <th>Create</th> */}
              {/* <th>Update</th> */}
              <th>Close</th>
            </tr>
            <tr>
              <th>Owner</th>
              <th>Due</th>
              <th>Assignees</th>
              <th>Next</th>
              <th>Plan</th>
              <th>Result</th>
              <th>Diff</th>
              {/* <th>At</th> */}
              {/* <th>At</th> */}
              <th>At</th>
            </tr>
          </thead>

          <tbody>
            {project.issues.map(d => makeTrs(d))}
          </tbody>
        </table>
    );
}
