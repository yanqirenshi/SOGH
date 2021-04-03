import React, { useState, useEffect } from 'react';
import moment from 'moment';

import ContentsArea  from './ContentsArea.js';
import SprintListArea from './SprintListArea.js';

import style from './Style.js';

export default function Contents (props) {
    const [changed, setChanged] = useState(null);

    const scrum = props.scrum;
    const sogh = scrum._sogh;

    const base = scrum._data;
    const data = scrum._projects;

    return (
        <div style={style.root}>
          <ContentsArea repository={props.repository}
                        milestone={base.milestone}
                        filter={data.filter}
                        issues={base.issues}
                        projects={data.projects}
                        projects_filterd={data.projects_filterd}
                        callbacks={props.callbacks}
                        close_projects={data.close_projects}
                        sogh={scrum._sogh}
                        scrum={scrum} />
        </div>
    );
}
