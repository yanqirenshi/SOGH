import React from 'react';
import moment from 'moment';

function dt (type, v) {
    if (type==='projects')
        return v.key.name();

    if (type==='duedates') {
        const date = v.key;

        if (date==='null')
            return '未設定';

        const m = moment(date);

        if (!m.isValid())
            return `??? (${date})`;

        return m.format('MM-DD ddd');
    }

    return v;
};

function keyLabel (type) {
    if (type==='projects')
        return 'Backlog';

    if (type==='duedates')
        return 'Date';

    return '???';
}

export default function Summary (props) {
    const type = props.type;
    const data = props.source;

    const style = {
        head: { fontSize:14 },
        table: { fontSize:14 },
        td_key: type==='duedates' ? {whiteSpace: 'nowrap'} : {minWidth:111},
        td_num: {textAlign:'right'}
    };

    return (
        <div>
          <nav className="panel">

            <div className="panel-heading" style={style.head}>
              <div>
                Summary
              </div>
            </div>

            <div className="panel-block">
              <table className="table is-striped is-narrow is-hoverable is-fullwidth"
                     style={style.table}>
                <thead>
                  <tr>
                    <th>{keyLabel(type)}</th>
                    <th>Plan</th>
                    <th>Result</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((d,i)=>{
                      return (
                          <tr key={i}>
                            <td style={style.td_key}>
                              {dt(type, d)}
                            </td>
                            <td style={style.td_num}>
                              {d.plan}
                            </td>
                            <td style={style.td_num}>
                              {d.result}
                            </td>
                            <td style={style.td_num}>
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
