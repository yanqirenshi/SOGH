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

function point (type, issues) {
    return issues.reduce((total, issue) => {
        return total + (issue.point[type] || 0);
    }, 0);
}

export default function Summary (props) {
    const ht = props.source.ht;
    const dates = Object.keys(ht).sort();

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
                  </tr>
                </thead>

                <tbody>
                  {dates.map(date=>{
                      const plan = point('plan', ht[date]);
                      const result = point('result', ht[date]);

                      return (
                          <tr key={date}>
                            <td style={{whiteSpace: 'nowrap'}}>
                              {dt(date)}
                            </td>
                            <td style={{textAlign:'right'}}>
                              {plan}
                            </td>
                            <td style={{textAlign:'right'}}>
                              {result}
                            </td>
                            <td style={{textAlign:'right'}}>
                              {plan - result}
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
