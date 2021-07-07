import React from 'react';
import {LinkBlank} from '../Links.js';

function color (hexcolor) {
    var r = parseInt( hexcolor.substr( 1, 2 ), 16 ) ;
    var g = parseInt( hexcolor.substr( 3, 2 ), 16 ) ;
    var b = parseInt( hexcolor.substr( 5, 2 ), 16 ) ;

    return ( ( ( (r * 299) + (g * 587) + (b * 114) ) / 1000 ) < 128 ) ? "white" : "black" ;
};

function labelStyle (d) {
    const background = '#' + d.color;
    return {
        color: color(background),
        background: background,
        whiteSpace: 'nowrap',
        padding: ' 2px 4px',
        borderRadius: 5,
        display: 'inline-block',
        marginRight: '.25em',
        marginBottom: '.25em',
        fontSize: 12,
    };
}

export default function Labels (props) {
    const issue = props.issue;

    const labels = [];
    let tmp = [];
    for (const label of issue.labels.nodes) {
        tmp.push(label);
        if (tmp.length===2) {
            labels.push(tmp);
            tmp = [];
        }
    }

    return (
        labels.map((l,i) => {
            return (
                <div key={i}>
                  {l.map(d => {
                      const label_style = labelStyle(d);
                      return (
                          <p key={d.id}
                             style={label_style}>
                            <LinkBlank href={d.url}>
                              {d.name}
                            </LinkBlank>
                          </p>
                      );
                  })}
                </div>
            );
        })
    );
}
