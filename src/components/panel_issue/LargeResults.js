import React from 'react';

const style = {};

export default function LargeResults (props) {
    const issue = props.issue;
    const point = issue.points();
    const results = point.results ? point.results.details : [];

    return (
        <div className="field">
          <label className="label" style={{marginBottom:0}}>
            Result
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
                      <th>Date</th>
                      <th>Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((d,i)=>{
                        return (
                            <tr key={i}>
                              <td>{d.parson}</td>
                              <td>{d.date}</td>
                              <td>{d.point}</td>
                            </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    );
}
