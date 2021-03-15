import React from 'react';
import moment from 'moment';

function makeLabels (d,i) {
    const aStyle = (hexcolor) => {
        var r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
        var g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
        var b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

        const color = ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;

        return color;
    };

    const style = {
        whiteSpace: 'nowrap',
        background: '#' + d.color,
        color: aStyle('#' + d.color),
        padding: '3px 6px',
        borderRadius: 5,
        fontSize: 12,
        textAlign: 'center',
        marginTop: i===0 ? 0 : 3,
        marginRight: 6,
        display: 'inline-block',
    };

    return <p key={d.id} style={style}>
             {d.name}
           </p>;
}

function makeProjectColumn (d, project) {
    const cards = d.projectCards.nodes;

    if (cards.length===0)
        return '';

    const target = cards.find(d => d.column.project.id===project.id);

    if (!target)
        return '';

    return <p>{target.column.name}</p>;
}

function due (v) {
    if (!v)
        return '';

    const m = moment(v);

    if (!m.isValid())
        return '';

    return m.format('MM-DD ddd');
}

function makeTr (d, project) {
    return <tr key={d.id}>
             <td>
               <a href={d.url} target="_blank" rel="noreferrer">
                 {d.number}
               </a>
             </td>
             <td>{d.title}</td>
             <td>{d.labels.nodes.map((d,i) => makeLabels(d,i))}</td>
             <td style={{whiteSpace: 'nowrap'}}>{makeProjectColumn(d, project)}</td>
             <td style={{whiteSpace: 'nowrap'}}>{due(d.due_date)}</td>
             <td>{d.point.plan}</td>
             <td>{d.point.result}</td>
           </tr>;
}

export default function Milestone (props) {
    const data = props.source;
    const project = props.project;

    return (
        <nav className="panel">
          <p className="panel-heading" style={{fontSize:14}}>
            {data.title}
          </p>
          <div className="panel-block">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th colSpan="3">Issue</th>
                  <th>Project</th>
                  <th>Due</th>
                  <th colSpan="2">Point</th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Labels</th>
                  <th>Column</th>
                  <th>Date</th>
                  <th>Plan</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                {props.source.issues.map(d => makeTr(d, project))}
              </tbody>
            </table>
          </div>
        </nav>
    );
}
