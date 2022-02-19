import React from 'react';

import Field from './Field.js';
import Project from './Project.js';
import Label from './Label.js';
import Milestone from './Milestone.js';

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

    return (
        <div>
          <Field label="Project">
            {projects.length===0 && 'なし'}
            {projects.map(p=> <Project project={p}/>)}
          </Field>

          <Field label="Label">
            {labels.length===0 && 'なし'}
            {labels.map(d=> <Label label={d}/>)}
          </Field>

          <Field label="Milestone">
            {!milestone && 'なし' }
            {milestone && <Milestone milestone={milestone}/>}

          </Field>
        </div>
    );
}
