import React, { useState } from 'react';

import Label from './Label.js';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    search: {
        paddingBottom: 3,
    },
    list: {
        flexGrow: 1,
        position: 'relative',
        container: {
            position: 'absolute',
            overflow: 'auto',
            width:'100%',
            height: '100%',
            border: '1px solid #dddddd',
            padding: 3,
        },
    },
};

function filtering (keyword, list) {
    if (keyword==='')
        return list;

    const k = keyword.toUpperCase();

    return list.filter(d=>{
        const name = d.name();
        return name.toUpperCase().includes(k);
    });
}

function isSelected (label, selected_labels) {
    return selected_labels.find(d=>d===label.id());
}

function split (selected, list) {
    if (selected.length===0)
        return { selected: [], un_selected: list };

    return list.reduce((out, d)=> {
        if (selected.find(id=>id===d.id()))
            out.selected.push(d);
        else
            out.un_selected.push(d);

        return out;
    }, { selected: [], un_selected: [] });
};

export default function Labels (props) {
    const [keyword, setKeyword] = useState('');

    const data = props.source;
    const callback = props.callback;

    const change = (e) => setKeyword(e.target.value);

    const click = (e) => {
        const data_id = e.target.getAttribute('data_id');
        const new_data = {...data};

        const new_labels = [];
        let exist = false;
        for (const label_id of new_data.labels) {
            if (label_id===data_id)
                exist = true;
            else
                new_labels.push(label_id);
        }

        if (!exist)
            new_labels.push(data_id);

        new_data.labels = new_labels;

        callback(new_data);
    };

    const labels_filterd = filtering(keyword, props.labels.list);
    const selected_labels = data.labels;

    const x = split(selected_labels, labels_filterd);

    return (
        <div style={style}>
          <div>
            {x.selected.map(d=>{
                return (
                    <Label key={d.id()}
                           label={d}
                           selected={isSelected(d, selected_labels)}
                           callback={click}/>
                );
            })}
          </div>

          <div style={style.search}>
            <input className="input is-small"
                   type="text"
                   placeholder="Filter"
                   value={keyword}
                   onChange={change} />
          </div>

          <div style={style.list}>
            <div style={style.list.container}>
              {x.un_selected.map(d=>{
                  return (
                      <Label key={d.id()}
                             label={d}
                             selected={isSelected(d, selected_labels)}
                             callback={click}/>
                  );
              })}
            </div>
          </div>
        </div>
    );
}
