import * as attr from './attributes.js';

const query = `{
  repository(name: "@name", owner: "@owner") {
    label(name: "@label_name") {
      issues(after: "", first: 100, states: OPEN) {
        nodes {
          id
          url
          title
          createdAt
          closedAt
          updatedAt
          number
          body
          bodyHTML
          projectCards(first: 1) {
            nodes {
              id
              url
              note
              state
              column {
                id
                name
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
          labels(first: 10) {
            nodes {
              color
              id
              name
              url
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
