import React from 'react';

const style = {
    display:'flex',
    width:333,
    marginRight: 11,
    marginBottom: 11,
};

export default function Keyword (props) {
    const filter = props.filter;
    const changeKeyword = props.changeKeyword;
    const clearKeyword = props.clearKeyword;

    return (
            <div style={style}>
              <input className="input is-small"
                     type="text"
                     placeholder="Search Project Name"
                     value={filter.keyword || ''}
                     onChange={changeKeyword} />

              <button className="button is-small"
                      onClick={clearKeyword}>
                Clear
              </button>
            </div>
    );
}
