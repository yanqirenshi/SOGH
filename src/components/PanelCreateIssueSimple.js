import React from 'react';

// import Description from './panel_create_issue/Description.js';
import DescriptionText from './panel_create_issue/DescriptionText.js';
import DescriptionFields from './panel_create_issue/DescriptionFields.js';
import ViewAttributes from './panel_create_issue/ViewAttributes.js';

const style = {
    width: '100%',
    height: '100%',
    display:'flex',
    flexDirection: 'column',
    head: {
        padding: 0,
        marginBottom: 6,
    },
    body: {
        display:'flex',
        flexGrow: 1,
        marginBottom: 6,
        projects: {
            width: 188,
        },
        description: {
            marginLeft: 0,
            marginRight: 0,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        labels: {
            marginLeft: 8,
            width: 188,
        },
    },
    tail: {
        assignees: {
            overflow: 'auto',
            height: 88,
            marginBottom: 6,
            border: '1px solid #ddd',
            padding: 3,
        },
        milestones: {
            overflow: 'auto',
            height: 88,
            border: '1px solid #ddd',
            padding: 3,
        },
    },
};

export default function PanelCreateIssueSimple (props) {
    const data = props.source;
    const callback = props.callback;
    const sogh = props.sogh;

    const change = (e) => {
        const new_value = e.target.value;
        const new_data = {...data};

        new_data.title = new_value;

        callback(new_data);
    };

    return (
        <div style={style}>
          <div style={style.head}>
            <input className="input is-small"
                   type="text"
                   placeholder="Title"
                   value={data.title}
                   onChange={change} />
          </div>

          <div style={style.body}>
            {/* <div style={style.body.projects}> */}
            {/* </div> */}

            <div style={style.body.description}>
              <DescriptionText data={data} callback={callback}/>
            </div>

            <div style={style.body.labels}>
              <DescriptionFields data={data}
                                 callback={callback}
                                 direction="column"/>
              <div style={{marginTop:22}}>
                <ViewAttributes data={data} sogh={sogh}/>
              </div>
            </div>
          </div>

          {/* <div style={style.tail}> */}
          {/* </div> */}
        </div>
    );
}
