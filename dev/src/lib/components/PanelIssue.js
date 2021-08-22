import React from 'react';

import PanelIssueLarge from './panel_issue/PanelIssueLarge.js';
import PanelIssueSmall from './panel_issue/PanelIssueSmall.js';

export default function PanelIssue (props) {
    const issue = props.issue;
    const sogh = props.sogh;
    const size = props.size;

    const style = {
        width: props.w || 200,
    };

    return (
        <div style={style}>
          {'l'===size
           && <PanelIssueLarge issue={issue}
                               sogh={sogh} />}

          {'s'===size
           && <PanelIssueSmall issue={issue}
                               sogh={sogh} />}
        </div>
    );
}
