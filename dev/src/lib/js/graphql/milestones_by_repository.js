import * as attr from './attributes.js';

const query = `{
  repository (${attr.repository_key}) {
    milestones(${attr.pagenation}, states: OPEN) {
      nodes {
        ${attr.milestone}
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;

export default query;
