import React from 'react';
import {
    Sections, Section, Contents,
} from '../components/Common.js';

function P1010012 (props) {
    return (
        <Sections>
          <Section title="Repository">
            <Contents>
              <p><pre>{graphql}</pre></p>
            </Contents>
          </Section>
        </Sections>
    );
}

export default P1010012;

const graphql = `{
  id
  createdAt
  updatedAt
  name
  url
  description
  descriptionHTML
  pushedAt
  owner {
    id
    login
    resourcePath
  }
}`;
