import React, { useState } from 'react';

import Measure from 'react-measure';
import Masonry from 'react-masonry-component';

import CardIssue from '../../components/common/CardIssue.js';
import CardFilter4Issues from '../../components/common/CardFilter4Issues.js';

const COLUMN_WIDTH = 200;
const GUTTER = 20;

function calW (dimensions) {
    const w = Math.floor(dimensions.width / (200 + 20));

    return (w * (COLUMN_WIDTH + GUTTER)) - GUTTER;
}

export default function Contents (props) {
    const [dimensions, setDimensions] = useState({width:0});

    const gtd = props.gtd;

    const style = {
        root: {
            width: '100%',
            padding:22,
        }
    };

    const opt = {
        itemSelector: '.sogh-card-item',
        columnWidth: COLUMN_WIDTH,
        gutter: GUTTER,
    };

    const issues = props.issues;
    const filter = props.filter;

    const sorter = (a, b) => {
        return a.updatedAt < b.updatedAt ? -1 : 1;
    };

    const issues_filterd = gtd.filteringIssues2filter(filter, issues).sort(sorter);

    return (
        <div style={style.root}>
          <Measure bounds onResize={contentRect => setDimensions(contentRect.bounds)}>
            {({ measureRef }) => (
                <div ref={measureRef} style={{width:'100%'}}>
                  <div style={{width: calW(dimensions), marginLeft:'auto', marginRight: 'auto'}}>
                    <Masonry options={opt}>

                      {(filter.projects.list.length>0
                        || filter.milestones.list.length>0 ) &&
                       <CardFilter4Issues filter={filter} callbaks={props.callbaks} />}

                      {issues_filterd.map(d => {
                          return (
                              <CardIssue key={d.id}
                                         issue={d}
                                         sogh={gtd._sogh}/>
                          );
                      })}

                    </Masonry>
                  </div>
                </div>
            )}
          </Measure>
        </div>
    );
}
