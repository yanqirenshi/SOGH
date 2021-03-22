import React from 'react';

import Repository from './card_filter_for_issues/Repository.js';

export default function CardFilter4Issues (props) {
    return (
        <Repository filter={props.filter} callbaks={props.callbaks} />
    );
}
