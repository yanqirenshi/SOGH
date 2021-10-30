import React from 'react';
import {LinkBlank} from './Links.js';

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
        padding: '1px 5px',
        borderRadius: 3,
        display: 'inline-block',
        marginRight: '.25em',
        marginBottom: '.25em',
        fontSize: 10,
    };
}

function makeLabelsList (split_len, labels) {
    const out = [];

    let tmp = [];
    for (const label of labels) {
        tmp.push(label);

        if (tmp.length===split_len) {
            out.push(tmp);
            tmp = [];
        }
    }

    if (tmp.length!==0)
        out.push(tmp);

    return out;
}

export default function Labels (props) {
    const issue = props.issue;
    const split_len = props.split || 2;

    // ラベルは一行二つ表示にする。
    const labels_list = makeLabelsList(split_len, issue.labels());

    return (
        labels_list.map((labels,i) => {
            return (
                <div key={i}>
                  {labels.map(label => {
                      const label_style = labelStyle(label);
                      return (
                          <p key={label.id}
                             style={label_style}>
                            <LinkBlank href={label.url}>
                              {label.name}
                            </LinkBlank>
                          </p>
                      );
                  })}
                </div>
            );
        })
    );
}
