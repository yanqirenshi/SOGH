import React, { useState } from 'react';
import moment from 'moment';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
    paddingTop: 3,
};

function marker (today, d) {
    const style = {
        width: 6,
        minWidth: 6,
        height: '100%',
        background : 'rgb(162, 32, 65)',
        marginRight: 6,
        borderRadius: 2,
    };

    const ret = /(\d+-\d+-\d+)\s+〜\s+(\d+-\d+-\d+)/.exec(d.title);

    if (!ret)
        return null;

    const from = moment(ret[1]);
    const to   = moment(ret[2]);

    if (!from.isValid() || !to.isValid())
        return null;


    if (today.isSameOrAfter(from) && today.isSameOrBefore(to.add(1,'d')))
        return <div style={style} />;

    return null;
}

function filtering (keyword, list) {
    if (keyword.trim()==='')
        return list;

    const k = keyword.toUpperCase();

    return list.filter(d=>{
        const name = d.title;
        return name.toUpperCase().includes(k);
    });
}


function itemStyle (mailestone, selected_milestone) {
    const slected = selected_milestone && selected_milestone===mailestone.id;

    return {
        color: slected ? 'rgb(162, 32, 65)' : '#333',
        background: '#fff',
        border: slected ? '1px solid rgb(162, 32, 65)' : '1px solid #dddddd',
        borderRadius: 3,
        marginRight: 3,
        marginBottom: 3,
        padding: '3px 6px',
        fontSize: 14,
        display: 'flex',
    };
}

function split (selected, list) {
    if (selected.length===0)
        return { selected: [], un_selected: list };

    return list.reduce((out, d)=> {
        if (selected.find(id=>id===d.id))
            out.selected.push(d);
        else
            out.un_selected.push(d);

        return out;
    }, { selected: [], un_selected: [] });
};

export default function Milestones (props) {
    const [keyword, setKeyword] = useState('');

    const data = props.source;
    const callback = props.callback;

    const change = (e) => setKeyword(e.target.value);

    const click = (e) => {
        const data_id = e.target.getAttribute('data_id');
        const new_data = {...data};

        if (new_data.milestone===null || new_data.milestone!==data_id)
            new_data.milestone = data_id;
        else
            new_data.milestone = null;

        callback(new_data);
    };

    const today = moment().startOf('day');

    const milestones_filterd = filtering(keyword, props.milestones.list);
    const selected_milestone = data.milestone;

    const x = split([selected_milestone], milestones_filterd);

    const list = [].concat(x.selected).concat(x.un_selected);

    return (
        <div style={style}>
          <input className="input is-small"
                 style={{width:222, marginRight:3,marginBottom:3}}
                 type="text"
                 placeholder="Filter"
                 value={keyword}
                 onChange={change} />

          {list.map(d=>{
              return (
                  <div key={d.id}
                       style={itemStyle(d, selected_milestone)}
                       data_id={d.id}
                       onClick={click}>
                    {marker(today, d)}
                    {d.title}
                  </div>
              );
          })}
        </div>
    );
}
