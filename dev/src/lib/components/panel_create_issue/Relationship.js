import React from 'react';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 14,
    title: {
        textAlign: 'center',
    },
    value: {
        marginTop:5,
        textAlign: 'center',
        contents: {
            display: 'flex',
            fontSize:14,
            flexWrap: 'wrap',
            justifyContent: 'center'
        },
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
             style={style.value.contents}>
          <p>{v.title || v.login || '???'}</p>

          {v.number
           && <p style={{marginLeft:6}}>
                (
                <a href={v.url} target="_blank" rel="noreferrer">
                  {v.number}
                </a>
                )
              </p>}
        </div>
    );
}

export default function Relationship (props) {
    const callbacks = props.callbacks;

    const clickSelector = () => callbacks.selector.swith();

    return (
        <div style={style}>
          <div style={style.title}>
            <button className={props.is_opened ? "button is-small is-warning" : "button is-small"}
                    onClick={clickSelector}>
              {props.title}
            </button>
          </div>

          <div style={style.value}>
            {contents(props.contents)}
          </div>
        </div>
    );
}
