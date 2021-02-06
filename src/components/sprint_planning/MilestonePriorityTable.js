import React from 'react';

import IssueSummary from './IssueSummary.js';

function makeRow (style, priority, priorities, point) {
    let total = 0;

    const out = priorities.map(d=> {
        const p = point(priority[d.code]);

        total += p;

        return <td key={d.code} style={style}>
                 {p}
               </td>;
    });

    out.push(<td key="total" style={style}>{total}</td>);

    return out;
}


export default function MilestonePriorityTable (props) {
    const data = props.data;
    const priority = data.gross.priority;

    const priorities = [
        { code: 'c', label: '緊急' },
        { code: 'h', label: '高' },
        { code: 'n', label: '普' },
        { code: 'l', label: '低' },
    ];

    const num = {
        whiteSpace: 'nowrap',
        textAlign: 'right'
    };
    return (
        <table className="table is-bordered is-striped is-narrow is-hoverable"
               style={{fontSize:14}}>
          <thead>
            <tr>
              <th></th>
              {priorities.map(d=><th key={d.code} style={{whiteSpace: 'nowrap'}}>{d.label}</th>)}
              <th style={{whiteSpace: 'nowrap'}}>
                合計
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Plan</td>
              {makeRow(num, priority, priorities, d=>d.plan)}
            </tr>
            <tr>
              <td>Result</td>
              {makeRow(num, priority, priorities, d=>d.result)}
            </tr>
            <tr>
              <td>差</td>
              {makeRow(num, priority, priorities, d=>d.plan-d.result)}
            </tr>
          </tbody>
        </table>
    );
}
