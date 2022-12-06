import * as attr from './attributes.js';

const query = `{
  node(id: "@column-id") {
    id
    ... on ProjectColumn {
      ${attr.project_column}
      cards(after: "", first: 100) {
        edges {
          node {
            ${attr.project_card}
            content {
              ... on Issue {
                ${attr.issue}
                repository {
                  ${attr.repository}
                }
                projectCards {
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
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
}`;

export default query;
