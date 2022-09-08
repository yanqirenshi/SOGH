import * as attr from './attributes.js';

const query = `{
  node(id: "@id") {
    ... on Milestone {
      ${attr.milestone}
    }
  }
}
`;

export default query;
