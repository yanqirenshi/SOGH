import React, { useState, useEffect } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './scrum_timeline/Contents.js';

import Filter from '../../js/Filter.js';

export default function ScrumTimeline (props) {
    const [filter] = useState(new Filter());

    const sogh = props.sogh;

    return (
        <>
          {sogh  && <Contents sogh={props.sogh}
                              repository={props.repository}
                              filter={filter}/>}
          {!sogh && <NotSignIn />}
        </>
    );
}
