import React from 'react';
import moment from 'moment';

function dt (v) {
    if (!v)
        return '';

    const m = moment(v);

    if (!m.isValid())
        return '';

    return m.format('MM-DD ddd');
}

const style = {
    nowrap: {
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
};

export default function TdClosedAt (props) {
    const issue = props.issue;

    return (
          <td style={style.nowrap}>{dt(issue.closedAt())}</td>
    );
}
