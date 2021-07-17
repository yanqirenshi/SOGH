import React from 'react';
import {
    Sections, Section, Contents,
} from '../components/Common.js';

function P1010011 (props) {
    return (
        <Sections>
          <Section title="Project">
            <Contents>
              <p><pre>{graphql}</pre></p>
            </Contents>
          </Section>
        </Sections>
    );
}

export default P1010011;

const graphql = `{
  id
  createdAt
  updatedAt
  closedAt
  number
  name
  body
  bodyHTML
  url
  state
  closed
  progress {
    todoPercentage
    todoCount
    inProgressPercentage
    inProgressCount
    enabled
    donePercentage
    doneCount
  }
}`;
