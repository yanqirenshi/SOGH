import * as attr from './attributes.js';

const query = `{
  node(id: "@id") {
    ... on Milestone {
      ${attr.milestone}
      repository {
        ${attr.repository}
        owner {
          ${attr.user}
        }
      }
    }
  }
}
`;

export default query;
