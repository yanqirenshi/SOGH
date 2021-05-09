import React from 'react';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    title: {
        textAlign: 'center',
    },
    value: {
        marginTop:5,
        textAlign: 'center',
    }
};

function contents (v) {
    if (!v)
        return <p>未選択</p>;

    if (Array.isArray(v))
        if (v.length===0)
            return <p>未選択</p>;
        else
            return v.map(d=>contents(d));

    return (
        <div key={v.id}
             style={{display: 'flex', fontSize:14, flexWrap: 'wrap'}}>
          <p>{v.title}</p>

          {v.number
           && <p style={{marginLeft:6}}>({v.number})</p>}
        </div>
    );
}

export default function Relationship (props) {
    const callbacks = props.callbacks;

    const clickSelector = () => callbacks.selector.swith();

    return (
        <div style={style}>
          <div style={style.title}>
            <button className="button is-small"
                    onClick={clickSelector}>
              <h1 className="title is-6">{props.title}</h1>
            </button>
          </div>

          <div style={style.value}>
            {contents(props.contents)}
          </div>
        </div>
    );
}
