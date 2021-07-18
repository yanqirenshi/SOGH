import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    left: {
        flexGrow:1,
        width: '100%',
        height: '100%',
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
        marginLeft: 20,
        position: 'relative',
        overflow: 'auto',
        viewer: {
            position: 'absolute',
        }
    },
};

export default function Description (props) {
    const data = props.source;
    const callback = props.callback;

    const change = (e) => {
        const new_value = e.target.value;
        const new_data = {...data};

        new_data.description = new_value;

        callback(new_data);
    };

    return (
        <div style={style}>
          <div style={style.left}>
            <textarea className="textarea"
                      style={style.left.input}
                      placeholder="Description"
                      value={data.description}
                      onChange={change} />
          </div>

          <div style={style.right}
               className="sogh_markdown">
            <div style={style.right.viewer}>
              <ReactMarkdown remarkPlugins={[gfm]}
                             children={data.description} />,
            </div>

          </div>
        </div>
    );
}
