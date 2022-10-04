import React from 'react';

import Field from './Field.js';
import Project from './Project.js';
import Label from './Label.js';
import Milestone from './Milestone.js';
import Assignee from './Assignee.js';

export default function ViewAttributes (props) {
    const data = props.data;
    const sogh = props.sogh;

    const master = sogh.active();

    const projects = data.projects.reduce((list,id)=> {
        const data = master.projects.ht[id];
        if (data) list.push(data);
        return list;
    }, []);

    const labels = data.labels.reduce((list,id)=> {
        const data = master.labels.ht[id];
        if (data) list.push(data);
        return list;
    }, []);

    const milestone = master.milestones.ht[data.milestone];

    const assignees = data.assignees.reduce((list,id)=> {
        const data = master.assignees.ht[id];
        if (data) list.push(data);
        return list;
    }, []);

    return (
        <div>
          <Field label="Project">
            {projects.length===0 && 'なし'}
            {projects.map(d=> <Project key={d.id()} project={d}/>)}
          </Field>

          <Field label="Label">
            {labels.length===0 && 'なし'}
            {labels.map(d=> <Label key={d.id()} label={d}/>)}
          </Field>

          <Field label="Milestone">
            {!milestone && 'なし' }
            {milestone && <Milestone milestone={milestone}/>}
          </Field>

          <Field label="Assignees">
            {!assignees && 'なし' }
            {assignees.map(d=> <Assignee key={d.id()} assignee={d}/>)}
          </Field>
        </div>
    );
}
