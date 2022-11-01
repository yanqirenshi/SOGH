import * as attr from './attributes.js';

const query = `{
  viewer {
    issues(after: "", first: 100, states: OPEN) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
        repository {
          id
          name
          url
        }
        projectCards(first: 10) {
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
    }
  }
}`;

export default query;
