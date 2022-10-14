import * as attr from './attributes.js';

const query = `{
  repository(${attr.repository_key}) {
    projects(${attr.pagenation}, states: CLOSE) {
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
