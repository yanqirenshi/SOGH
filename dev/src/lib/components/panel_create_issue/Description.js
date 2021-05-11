import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    left: {
        width: '50%',
        flexGrow: 1,
        paddingRight: 10,
        overflow:'auto',
        textarea: {
            minHeight: '100%',
            maxHeight: '100%',
            width: '100%',
        },
    },
    right: {
        width: '50%',
        flexGrow: 1,
        paddingLeft: 10,
        overflow: 'auto',
        background: '#fcfcfc',
        position: 'relative',
        view: {
            position: 'absolute',
        },
    },
};

export default function Description (props) {
    console.log('d2-1-1');
    const callback = props.callbacks.change.description;
    const change = (e) => callback(e.target.value);
    console.log('d2-1-2');

    return (
        <div style={style}>
          <div style={style.left}>
            <textarea className="textarea"
                      style={style.left.textarea}
                      defaultValue={props.contents}
                      onChange={change} />
          </div>

          <div style={style.right}
               className="sogh_markdown">
            <div style={style.right.view}>
              <ReactMarkdown remarkPlugins={[gfm]}
                             children={props.contents} />,
            </div>
          </div>
        </div>
    );
}
