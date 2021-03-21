import React from 'react';
import moment from 'moment';

import ButtonRefresh from '../../components/common/ButtonRefresh.js';

function dt (v) {
    return v ? moment(v).format('MM-DD HH:mm:ss') : '';
}

const style = {
    root: {
        maxWidth: 888,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

export default function Controller (props) {
    // props.sogh

    return (
        <div style={style.root}>
          <div style={{display: 'flex', alignItems: 'flex-end'}}>
            <ButtonRefresh callbacks={props.callbaks} />

            <span style={{marginLeft:6, fontSize:9, color: '#888'}}>
              最終更新: {dt(props.updated_at)}
            </span>
          </div>
        </div>
    );
}
