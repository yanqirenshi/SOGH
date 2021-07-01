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
    // issues
    return issues.reduce((total, issue) => {
        return total + (issue.point[type] || 0);
    }, 0);
}

export default function Summary (props) {
    const projects  = props.source.map(project=>{
        return {
            title: project.title || '@Project 未割り当て',
            plan: point('plan', project.issues),
            result: point('result', project.issues),
        };
    }).sort((a,b) => a.plan < b.plan ? 1 : -1);


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
                    <th>Project</th>
                    <th>Plan</th>
                    <th>Result</th>
                    <th>残</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map(project=>{
                      return (
                          <tr>
                            <td>
                              {project.title}
                            </td>
                            <td style={{textAlign:'right'}}>
                              {project.plan}
                            </td>
                            <td style={{textAlign:'right'}}>
                              {project.result}
                            </td>
                            <td>
                              {project.plan - project.result}
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
