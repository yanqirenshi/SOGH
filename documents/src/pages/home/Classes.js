import React from 'react';
import {
    Sections, Section, Contents, Link,
} from '../../components/Common.js';

import Wbs from './Wbs.js';

const columns = [
    {
        label: 'Code',
        required: true,
        contents: (c, d) => {
            const to= `/classes/${d._id}`;
            return <Link to={to}>{d._id}</Link>;
        }
    },
    {
        label: 'Name',
        leveling: true,
        required: true,
        contents: (c, d) => <span>{d.label}</span>,
    },
    {
        label: 'Description',
        contents: (c, d) => {
            return d.description;
        }
    },
];

export default function Classes (props) {
    return (
        <Sections>
          <Section title="クラス図">
            <Contents>
            </Contents>

            <Wbs wbs={props.wbs}
                 columns={columns}
                 start_id={100} />
          </Section>
        </Sections>
    );
}
