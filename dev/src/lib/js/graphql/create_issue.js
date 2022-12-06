import * as attr from './attributes.js';

// https://docs.github.com/ja/graphql/reference/mutations#createissue
const query = `mutation {
  createIssue(input:@issue-data) {
    issue {
      ${attr.issue}
      repository {
        ${attr.repository}
      }
      projectCards(first: 1) {
        nodes {
          ${attr.project_card}
          column {
            ${attr.project_column}
            project {
              ${attr.project2}
            }
          }
        }
      }
      milestone {
        ${attr.milestone}
      }
      assignees(first: 10) {
        nodes {
          ${attr.user}
        }
      }
      labels(first: 10) {
        nodes {
          ${attr.label}
        }
      }
    }
  }
}`;

export default query;
