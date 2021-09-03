import React from 'react';

const style = {
};

export default function LargePlans (props) {
    const issue = props.issue;
    // const point = issue.point;
    // const results = point.plans ? point.plans.details : [];

    return (
        <div className="field">
          <label className="label" style={{marginBottom:0}}>
            Plan
          </label>
          <div className="control" style={{display:'flex'}}>
            <div style={style}>
              <div>
              </div>

              <div>
                <table className="table is-striped is-narrow is-hoverable">
                  <thead>
                    <tr>
                      <th>Parson</th>
                      <th>Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td>{issue.point.plan}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    );
}
