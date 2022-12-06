import * as attr from './attributes.js';

const query = `{
  repository(name: "@name", owner: "@owner") {
    issues(after: "", first: 100) {
      nodes {
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
      pageInfo {
        ${attr.page_info}
      }
    }
  }
}
`;

export default query;
