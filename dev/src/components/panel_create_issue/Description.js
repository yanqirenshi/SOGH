import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    left: {
        width: '50%',
        paddingRight: 5,
        overflow:'auto',
        textarea: {
            minHeight: '100%',
            maxHeight: '100%',
            width: '100%',
        },
    },
    right: {
        width: '50%',
        height: '100%',
        paddingLeft: 20,
        overflow:'auto',
        view: {
            background: '#fcfcfc',
            width: '100%',
            height: '100%',
        },
    },
};

export default function Description (props) {
    const callback = props.callbacks.change.description;
    const change = (e) => callback(e.target.value);

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
            <ReactMarkdown remarkPlugins={[gfm]} children={props.contents} />,
          </div>
        </div>
    );
}
