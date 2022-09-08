import * as attr from './attributes.js';

// , states: OPEN
const query = `{
  repository(${attr.repository_key}) {
    projects(${attr.pagenation}) {
      nodes {
        ${attr.project}
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;

export default query;
