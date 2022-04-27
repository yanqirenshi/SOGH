import React from 'react';
import moment from 'moment';

import D3Gantt, {Rectum} from '@yanqirenshi/d3.gantt';

import TableIssueCountParsonColumn from './TableIssueCountParsonColumn.js';

import DATA from './DATA.js';

const rectum = new Rectum({
    transform:  {
        k: 0.2,
        x: 0.0,
        y: 0.0,
    },
    grid: { draw: false },
});

function term (from, to) {
    if (to)
        return {
            start: moment(from).startOf('day').toDate(),
            end:   moment(to).endOf('day').toDate(),
        };

    return {
        start: moment().startOf('day'),
        end:   moment().endOf('day'),
    };
}


function makeGraphData (columns) {
    const wbs = [];
    const workpackages = [];
    for (const column of columns) {
        if (column.issues.length===0)
            continue;

        wbs.push({ id: column.id, name: column.name, _core: column });

        for (const issue of column.issues)
            workpackages.push({
                id: issue.id,
                parent: column.id,
                name: issue.title(),
                plan: term(issue.createdAt(), issue.dueDate()),
                url: issue.url(),
                style: { background: issue.closedAt() ? '#ccc' : '#c1e4e9' },
                _core: issue,
            });
    }

    return {
        ...DATA,
        ...{
            wbs: wbs,
            workpackages: workpackages.sort((a,b)=>a.plan.end < b.plan.end ? -1 : 1),
        }
    };
}

export default function GanttChart (props) {
    const [unit, setUnit] = React.useState('w');
    const [data, setData] = React.useState(null);

    React.useEffect(()=> {
        setData(makeGraphData(props.data.columns.list));
    }, [props.data.columns.list]);

    React.useEffect(()=> {
        if (!data)
            return;

        const x = rectum.styling(data);
        rectum.data(rectum.styling(data));
    }, [data]);

    React.useEffect(()=> {
        if (!data) return;

        const new_data = {...data};

        new_data.scale.cycle = unit;

        setData(new_data);
    }, [unit]);

    const changeUnit = (e)=> setUnit(e.target.value);

    if (!data)
        return null;

    return (
        <section className="section" style={props.style}>
          {/* <div className="container"> */}
          {/*   <div className="select"> */}
          {/*     <select onChange={changeUnit} */}
          {/*             value={unit}> */}
          {/*       <option value="M">月</option> */}
          {/*       <option value="w">週</option> */}
          {/*     </select> */}
          {/*   </div> */}
          {/* </div> */}
          <div className="container" style={{height:700}}>
            <D3Gantt rectum={rectum}/>
          </div>
        </section>
    );
}
