import React from 'react';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    left: {
        flexGrow:1,
        width: '100%',
        height: '100%',
        marginRight: 2,
        input: {
            fontSize: 14,
            width: '100%',
            height: '100%',
        }
    },
    right: {
        flexGrow:1,
        width: '100%',
        height: '100%',
        marginLeft: 2,
        viewer: {
            width: '100%',
            height: '100%',
            background: '#eee',
        }
    },
};

export default function Description (props) {
    return (
        <div style={style}>
          <div style={style.left}>
            <textarea className="textarea"
                      style={style.left.input}
                      placeholder="Description"
                      defaultValue={props.source}/>
          </div>

          <div style={style.right}>
            <p style={style.right.viewer}>
            </p>
          </div>
        </div>
    );
}
