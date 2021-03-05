import React, { useState, useEffect } from 'react';

import {Section, Container} from 'react-bulma-components';

import Sogh from '../js/Sogh.js';

import Milestone from './product_backlog/Milestone.js';

export default function ProductBacklog (props) {
    const [sogh] = useState(new Sogh(props.token));

    return (
        <div>

          <Section>
            <Container>
              <div>Basic</div>
            </Container>
          </Section>

          <Section>
            <Container>
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
              <Milestone />
            </Container>
          </Section>

        </div>
    );
}
