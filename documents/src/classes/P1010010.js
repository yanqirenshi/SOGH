import React from 'react';
import {
    Sections, Section, Contents,
} from '../components/Common.js';

function P1010010 (props) {
    return (
        <Sections>
          <Section title="Milestone">
            <Contents>
              <p><pre>{graphql}</pre></p>
            </Contents>
          </Section>
        </Sections>
    );
}

export default P1010010;

const graphql = `{
    id
    url
    number
    title
    dueOn
    state
    description
    descriptionHTML
    createdAt
    updatedAt
    closedAt
  }
}`;
