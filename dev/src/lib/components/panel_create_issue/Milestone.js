import React from 'react';
import moment from 'moment';

function marker (today, d) {
    const style = {
        width: 6,
        minWidth: 6,
        background : 'rgb(162, 32, 65)',
        marginRight: 6,
        borderRadius: 2,
    };

    const ret = /(\d+-\d+-\d+)\s+〜\s+(\d+-\d+-\d+)/.exec(d.title());

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

function itemStyle (mailestone, selected) {
    return {
        color: selected ? 'rgb(162, 32, 65)' : '#333',
        background: '#fff',
        border: selected ? '1px solid rgb(162, 32, 65)' : '1px solid #dddddd',
        borderRadius: 3,
        marginRight: 3,
        marginBottom: 3,
        padding: '3px 6px',
        fontSize: 14,
        display: 'flex',
    };
}

export default function Milestone (props) {
    const milestone = props.milestone;
    const selected = props.selected;
    const callback = props.callback;

    const today = moment().startOf('day');

    const milestone_id = milestone.id();

    const click = (e) => {callback && callback(e);};

    return (
        <div key={milestone_id}
             style={itemStyle(milestone, selected)}
             data_id={milestone_id}
             onClick={click}>
          {marker(today, milestone)}
          {milestone.title()}
        </div>
    );
}
