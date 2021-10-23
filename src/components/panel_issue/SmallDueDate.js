import React from 'react';

const style = {
    fontSize:12,
    marginTop:8
};

export default function SmallDueDate (props) {
    const issue = props.issue;
    const due_date = issue.dueDate();

    if (!due_date)
        return null;

    return (
        <div style={style}>
          <p>納期: {due_date}</p>
        </div>
    );
}
