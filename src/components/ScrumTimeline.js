import React, { useState } from 'react';

import NotSignIn from './common/NotSignIn.js';

import Contents from './scrum_timeline/Contents.js';

import Filter from '../js/Filter.js';

export default function ScrumTimeline (props) {
    const [filter] = useState(new Filter({ status: { Open: true, Close: false }}));

    const sogh = props.sogh;

    return (
        <>
          {sogh  && <Contents sogh={props.sogh}
                              filter={filter}
                              repository={props.repository} />}
          {!sogh && <NotSignIn />}
        </>
    );
}
