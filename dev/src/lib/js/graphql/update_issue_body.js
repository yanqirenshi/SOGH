import * as attr from './attributes.js';

const query = `mutation {
  updateIssue(input:@issue-data) {
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
              ${attr.project}
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
