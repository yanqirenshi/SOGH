import React from 'react';
import moment from 'moment';

import ButtonRefresh from '../../components/common/ButtonRefresh.js';
import IconFilter from '../../components/common/IconFilter.js';


function dt (v) {
    return v ? moment(v).format('MM-DD HH:mm:ss') : '';
}

const style = {
    root: {
        maxWidth: 888,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
    },
    filter: {
        display:'flex',
        marginLeft: 22,
    },
}

export default function Controller (props) {
    const filter = props.filter.contents || {};
    const callbaks = props.callbaks.filter;

    const changeWord   = (e) => callbaks.changeContents('word', e.target.value);
    const changeLabels = (e) => callbaks.changeContents('labels', e.target.checked);
    const changeTitle  = (e) => callbaks.changeContents('title', e.target.checked);

    return (
        <div style={style.root}>
          <div style={{display: 'flex', alignItems: 'flex-end'}}>
            <ButtonRefresh callbacks={props.callbaks} />

            <span style={{marginLeft:6, fontSize:9, color: '#888'}}>
              最終更新: {dt(props.updated_at)}
            </span>
          </div>

          <div style={style.filter}>
            <div>
              <IconFilter />
            </div>

            <div>
              <input className="input is-small"
                     type="text"
                     placeholder="Text input"
                     defaultValue={filter.word}
                     onKeyUp={changeWord}/>
            </div>

            <div style={{display:'flex', marginLeft:11, alignItems: 'flex-end'}}>
              <div>
                <input type="checkbox"
                       checked={filter.targets.title}
                       onChange={changeTitle} />
                <span style={{marginLeft:3}}>
                  Title
                </span>
              </div>

              <div style={{marginLeft: 8}}>
                <input type="checkbox"
                       checked={filter.targets.labels}
                       onChange={changeLabels} />
                <span style={{marginLeft:3}}>
                  Project Column
                </span>
              </div>
            </div>
          </div>
        </div>
    );
}
