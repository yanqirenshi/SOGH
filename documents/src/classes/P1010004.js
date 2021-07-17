import React from 'react';
import {
    Sections, Section, Contents,
} from '../components/Common.js';

function P1010004 (props) {
    return (
        <Sections>
          <Section title="Issue">
            <Contents>
              <p><pre>{graphql}</pre></p>
            </Contents>
          </Section>
        </Sections>
    );
}

export default P1010004;

const graphql = `{
  id
  url
  title
  number
  body
  bodyHTML
  createdAt
  updatedAt
  closedAt
  assignees(first: 10) {
    nodes {}
  }
  labels(first: 10) {
    nodes {}
  }
  milestone {}
  projectCards(first: 10) {
    nodes {
      id
      url
      note
      state
      column {
        id
        name
        project {}
      }
    }
  }
  repository {}
}`;
