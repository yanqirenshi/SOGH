import React from 'react';

export default function SprintListArea (props) {
    return (
        <div>
          {props.milestones.map(d => {
              return <button key={d.id}
                             className="button is-small">
                       {d.title.replace('【スプリント】','').replaceAll('2021-','')}
                     </button>;
          })}
        </div>
    );
}
