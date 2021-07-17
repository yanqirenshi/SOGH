import React from 'react';
import moment from 'moment';

function dt (v) {
    if (v==='null')
        return '未設定';

    const m = moment(v);

    if (!m.isValid())
        return `??? (${v})`;

    return m.format('MM-DD ddd');
};

export default function Summary (props) {
    const data = props.source;

    return (
        <div>
          <nav className="panel">

            <div className="panel-heading" style={{fontSize:14}}>
              <div>
                Summary
              </div>
            </div>

            <div className="panel-block">
              <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Plan</th>
                    <th>Result</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map(d=>{
                      return (
                          <tr key={d.date}>
                            <td style={{whiteSpace: 'nowrap'}}>
                              {dt(d.date)}
                            </td>
                            <td style={{textAlign:'right'}}>
                              {d.plan}
                            </td>
                            <td style={{textAlign:'right'}}>
                              {d.result}
                            </td>
                            <td style={{textAlign:'right'}}>
                              {d.plan - d.result}
                            </td>
                          </tr>
                      );
                  })}
                </tbody>
              </table>
            </div>
          </nav>
        </div>
    );
}
