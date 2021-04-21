import React, { useState } from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";

import ANewTab from '../common/ANewTab.js';

function dt (v, type=0) {
    const fmt = (type===0) ? 'MM-DD' : 'YYYY-MM-DD';

    return !v ? '' : moment(v).format(fmt);
}

const style = {
    root: {
        minWidth: 1111,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    code: {
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
    num: {
        whiteSpace: 'nowrap',
        textAlign: 'right',
    },
    dt: {
        whiteSpace: 'nowrap',
        fontSize: 12,
    },
    plan: {
        whiteSpace: 'nowrap',
    },
}

function priority (d) {
    const m = {
        c: '急',
        h: '高',
        n: '普',
        l: '低',
    };

    const lable = m[d.priority];

    if (!lable)
        return '??';

    return lable + ` (${d.priority})`;
}

function theadContents () {
    return <>
             <tr>
               <th colSpan="6">Product backlog</th>
               <th colSpan="2">Plan</th>
               <th colSpan="2">Result</th>
               <th colSpan="6">Progress</th>
             </tr>
             <tr>
               <th>Priority</th>
               <th>#</th>
               <th>Type</th>
               <th>Title</th>
               <th>Status</th>
               <th>Assignee</th>
               <th>Start</th>
               <th>End</th>
               <th>Start</th>
               <th>End</th>
               <th colSpan="2">To Do</th>
               <th colSpan="2" style={{whiteSpace: 'nowrap'}}>In Progress</th>
               <th colSpan="2">Done</th>
             </tr>
           </>;
}

export default function Table (props) {
    const [selected, setSelected] = useState(null);

    const sogh = props.sogh;
    const projects = props.projects;

    const clickRow = (e) => {
        const getTr = (elem) => {
            if (elem.tagName==='TR')
                return elem;

            return getTr(elem.parentNode);
        };
        const project_id = getTr(e.target).getAttribute('project_id');

        setSelected(selected===project_id ? null : project_id);
    };

    return (
        <div style={style.root}>
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>{theadContents()}</thead>

            <tbody>
              {projects.map(d => {
                  const s = sogh.headerColor(d);

                  const font = { c: 17, h: 16, n: 15, l: 14};

                  return <tr key={d.id}
                             style={{fontSize:14}}
                             className={selected===d.id ? 'is-selected ' : null}
                             project_id={d.id}
                             onClick={clickRow}>
                           <td style={{...style.code, ...s}}>
                             {priority(d)}
                           </td>

                           <td>
                             <ANewTab to={d.url}>
                               {d.number}
                             </ANewTab>
                           </td>

                           <td style={style.code}>
                             {d.type}
                           </td>

                           <td style={{fontSize:font[d.priority] || 14}}>
                             <Link to={props.productbacklog_url_prefix + d.id}>
                               {d.title}
                             </Link>
                           </td>

                           <td>{d.state}</td>

                           <td>{d.assignee}</td>

                           <td style={style.plan} title={dt(d.plan.start,1)}>{dt(d.plan.start)}</td>
                           <td style={style.plan} title={dt(d.plan.end,1)}>{dt(d.plan.end)}</td>
                           <td style={style.plan} title={dt(d.result.start,1)}>{dt(d.result.start)}</td>
                           <td style={style.plan} title={dt(d.result.end,1)}>{dt(d.result.end)}</td>

                           <td style={style.num}>
                             {d.progress.todoCount}
                           </td>

                           {!d.progress.enabled &&
                            <td colSpan="5" style={{fontSize:12}}>
                              Disable track progress or Empty
                            </td>}

                           {d.progress.enabled &&
                            <td style={style.num}>
                              {Math.floor(d.progress.todoPercentage)}%
                            </td>}

                           {d.progress.enabled &&
                            <td style={style.num}>
                              {d.progress.inProgressCount}
                            </td>}

                           {d.progress.enabled &&
                            <td style={style.num}>
                              {Math.floor(d.progress.inProgressPercentage)}%
                            </td>}

                           {d.progress.enabled &&
                            <td style={style.num}>
                              {d.progress.doneCount}
                            </td>}

                           {d.progress.enabled &&
                            <td style={style.num}>
                              {Math.floor(d.progress.donePercentage)}%
                            </td>}
                         </tr>;
              })}
            </tbody>
          </table>
        </div>
    );
}
