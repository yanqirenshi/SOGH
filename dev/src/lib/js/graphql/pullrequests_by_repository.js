import * as attr from './attributes.js';

const query = `{
  repository(${attr.repository_key}) {
    pullRequests(${attr.pagenation}, states: OPEN) {
      nodes {
        ${attr.pullrequest}
        assignees(first: 10) {
          nodes {
            ${attr.user}
          }
        }
        suggestedReviewers {
           reviewer {
             ${attr.user}
           }
           isAuthor
           isCommenter
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;

export default query;
