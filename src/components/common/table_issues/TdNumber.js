import React from 'react';

import {LinkBlank} from '../Links.js';

const style = {
    right: {
        textAlign: 'right',
    },
};

export default function TdNumber (props) {
    const issue = props.issue;

    return (
        <td style={style.right}>
          <LinkBlank href={issue.url()}>
            {issue.number()}
          </LinkBlank>
        </td>
    );
}
