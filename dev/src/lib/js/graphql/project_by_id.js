import * as attr from './attributes.js';

const query = `{
  node(id: "@id") {
    ... on Project {
      ${attr.project}
    }
  }
}`;

export default query;
