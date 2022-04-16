import React, { useState } from 'react';
import { connect } from 'react-redux';

const style = {
    paddingTop: 66,
    display: 'flex',
    justifyContent: 'center',
};

function TabApi (props) {
    const sogh = props.sogh;


    const click = ()=> {
        sogh.searchIssues('is:open is:issue \\"$Owner 岩崎\\" in:body', (issues)=>{
            console.log(issues);
        }); // is:open
    };


    return (
        <div style={style}>
          <div>
            <button className="button"
                    onClick={click}>
              Search
            </button>
          </div>
        </div>
    );
}

export default connect(
    (state) => {
        return { sogh: state.sogh };
    },
    (dispatch) => ({}),
)(TabApi);
