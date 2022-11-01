import * as attr from './attributes.js';

const query = `{
  node(id: "@column-id") {
    id
    ... on ProjectColumn {
      id
      cards(after: "", first: 100) {
        edges {
          node {
            id
            note
            state
            isArchived
            content {
              ... on Issue {
                id
                url
                title
                updatedAt
                state
                number
                createdAt
                closedAt
                body
                bodyHTML
                labels(first: 10) {
                  nodes {
                    color
                    id
                    name
                    url
                  }
                }
                projectCards {
                  nodes {
                    id
                    url
                    note
                    state
                    column {
                      id
                      name
                      url
                      purpose
                      project {
                        ${attr.project}
                      }
                    }
                  }
                }
                milestone {
                  id
                  url
                  title
                  state
                  number
                  dueOn
                }
                assignees(first: 10) {
                  nodes {
                    id
                    login
                    name
                    url
                    email
                    avatarUrl
                    company
                    createdAt
                    updatedAt
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
