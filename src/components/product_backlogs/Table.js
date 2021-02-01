import React from 'react';
import moment from 'moment';

function dt (v) { return !v ? '' : moment(v).format('YYYY-MM-DD'); }

const style = {
    root: {
        width:1111,
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

export default function Table (props) {
    const sogh = props.sogh;
    const projects = props.projects;

    return (
        <div style={style.root}>
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th colSpan="4">Product backlog</th>
                <th colSpan="2">Schedule</th>
                <th colSpan="6">Progress</th>
                {/* <th colSpan="3">Timestamp</th> */}
              </tr>
              <tr>
                <th>Priority</th>
                <th>#</th>
                <th>Type</th>
                <th>Title</th>
                <th>Start</th>
                <th>End</th>
                <th colSpan="2">To Do</th>
                <th colSpan="2" style={{whiteSpace: 'nowrap'}}>In Progress</th>
                <th colSpan="2">Done</th>
                {/* <th>create</th> */}
                {/* <th>update</th> */}
                {/* <th>close</th> */}
              </tr>
            </thead>

            <tbody>
              {projects.map(d => {
                  const s = sogh.headerColor(d);

                  return <tr key={d.id}>
                           <td style={{...style.code, ...s}}>
                             {priority(d)}
                           </td>

                           <td>
                             <a href={d.url}>
                               {d.number}
                             </a>
                           </td>

                           <td style={style.code}>
                             {d.type}
                           </td>

                           <td>
                             {d.title}
                           </td>

                           <td style={style.plan}>{dt(d.plan.start)}</td>
                           <td style={style.plan}>{dt(d.plan.end)}</td>

                           <td style={style.num}>
                             {d.progress.todoCount}
                           </td>

                           <td style={style.num}>
                             {Math.floor(d.progress.todoPercentage)}%
                           </td>

                           <td style={style.num}>
                             {d.progress.inProgressCount}
                           </td>

                           <td style={style.num}>
                             {Math.floor(d.progress.inProgressPercentage)}%
                           </td>

                           <td style={style.num}>
                             {d.progress.doneCount}
                           </td>

                           <td style={style.num}>
                             {Math.floor(d.progress.donePercentage)}%
                           </td>

                           {/* <td style={style.dt}>{dt(d.createdAt)}</td> */}
                           {/* <td style={style.dt}>{dt(d.updatedAt)}</td> */}
                           {/* <td style={style.dt}>{dt(d.closedAt)}</td> */}
                         </tr>;
              })}
            </tbody>
          </table>
        </div>
    );
}
