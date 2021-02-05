import React from 'react';

export default function BarProgress (props) {
    const project = props.project;

    return (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
               style={{fontSize:12}}>

          <thead>
            <tr>
              <th>To Do</th>
              <th>In Progress</th>
              <th>Done</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                {project.progress.todoCount}
                <span>({Math.floor(project.progress.todoPercentage)}%)</span>
              </td>
              <td>
                {project.progress.inProgressCount}
                <span>({Math.floor(project.progress.inProgressPercentage)}%)</span>
              </td>
              <td>
                {project.progress.doneCount}
                <span>({Math.floor(project.progress.donePercentage)}%)</span>
              </td>
            </tr>
          </tbody>

        </table>
    );
}
