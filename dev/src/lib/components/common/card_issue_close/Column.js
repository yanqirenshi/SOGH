import React from 'react';

export default function Column (props) {
    const cards = props.issue.projectCards.nodes;

    if (cards.length===0)
        return null;

    const style = {
        root: {
            fontSize:12,
            paddingLeft:22,
            paddingRight: 11,
        },
    };

    return (
        <div style={style.root}>
          <p>{cards[0].column.name}</p>
        </div>
    );
}
