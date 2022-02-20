import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    left: {
        flexGrow: 1,
        height: '100%',
        marginLeft: 4,
        input: {
            border: '1px solid #eeeeee',
            background: '#fff',
            fontSize: 16,
            width: '100%',
            height: '100%',
            maxHeight: '100%',
        }
    },
    right: {
        flexGrow: 0.99,
        height: '100%',
        marginRight: 4,
        position: 'relative',
        overflow: 'auto',
        background: 'rgba(254, 244, 244, 0.1)',
        border: '1.5px solid rgba(254, 244, 244, 0.7)',
        borderRadius: 5,
        padding: '0px 22px',
        viewer: {
            position: 'absolute',
        }
    },
};

export default function Description (props) {
    const data = props.data;
    const callback = props.callback;

    const change = (e) => {
        const new_value = e.target.value;
        const new_data = {...data};

        new_data.description = new_value;

        callback(new_data);
    };

    return (
        <div style={style}>

          <div style={style.right}
               className="sogh_markdown">
            <div style={style.right.viewer}>
              <ReactMarkdown remarkPlugins={[gfm]}
                             children={data.description} />,
            </div>
          </div>

          <div style={style.left}>
            <textarea className="textarea has-fixed-size"
                      style={style.left.input}
                      placeholder="Description"
                      value={data.description}
                      onChange={change} />
          </div>

        </div>
    );
}
