import React from 'react';

import ANewTab from './ANewTab.js';

function labelColor (hexcolor) {
    var r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
    var g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
    var b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

    const color = ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;

    return color;
}

const style = {
    fontSize:12,
    display:'flex',
    flexWrap: 'wrap',
    marginTop: 11,
    paddingLeft: 11,
    paddingRight: 11,
    label: {
        marginRight: 6,
        marginBottom: 6,
        padding:'3px 6px',
        borderRadius: 5,
    }
};

export default function Labels (props) {
    const issue = props.issue;

    const labels = issue.labels();

    if (labels.length===0)
        return null;

    return (
        <div style={style}>
          {labels.map(d => {
              const color = '#' + d.color;
              return (
                  <p key= {d.id}
                     style={{...style.label,
                             ...{background: color,color: labelColor(color)}}}>
                    <ANewTab href={d.url}>
                      {d.name}
                    </ANewTab>
                  </p>
              );
          })}
        </div>
    );
}
