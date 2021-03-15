import React from 'react';
import moment from 'moment';
import ANewTab from './ANewTab.js';

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

const labelStyle = (d) => {
    return {
        background: '#' + d.color,
        whiteSpace: 'nowrap',
        padding: ' 2px 4px',
        borderRadius: 5,
        display: 'inline-block',
        marginRight: '.25em',
        marginBottom: '.25em',
        fontSize: 12,
    };
}

const aStyle = (hexcolor) => {
    var r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
    var g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
    var b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

    const color = ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;

    return { color: color };
};

function makeTrs (issue) {

    return <tr key={issue.id}>
             <td style={style.right}>
               <ANewTab to={issue.url}>
                 {issue.number}
               </ANewTab>
             </td>
             <td>{issue.title}</td>
             <td>{issue.labels.nodes.map(l => {
                 const label_style = labelStyle(l);
                 return <p key={l.id}
                           style={label_style}>

                          <ANewTab to={l.url} style={aStyle(label_style.background)}>
                            {l.name}
                          </ANewTab>

                        </p>;
             })}</td>
             <td style={style.nowrap}>
               {issue.assignees.nodes.map(a => {
                   return <span key={issue.id+'.'+a.id}>
                            {a.name || a.login}
                          </span>;
               })}
             </td>
             <td style={style.right}>{issue.point.plan}</td>
             <td style={style.right}>{issue.point.result}</td>
             <td style={style.nowrap}>{dt(issue.createdAt)}</td>
             <td style={style.nowrap}>{dt(issue.updatedAt)}</td>
             <td style={style.nowrap}>{dt(issue.closedAt)}</td>
           </tr>;
}

export default function SprintBacklogsTable (props) {
    const project = props.project;

    return (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">Title</th>
              <th rowSpan="2">Labels</th>
              <th rowSpan="2">Assignees</th>
              <th colSpan="2">Point</th>
              <th>Create</th>
              <th>Update</th>
              <th>Close</th>
            </tr>
            <tr>
              <th>Plan</th>
              <th>Result</th>
              <th>At</th>
              <th>At</th>
              <th>At</th>
            </tr>
          </thead>

          <tbody>
            {project.issues.map(d => makeTrs(d))}
          </tbody>
        </table>
    );
}
