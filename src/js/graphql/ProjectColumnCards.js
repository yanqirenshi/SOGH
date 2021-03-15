const query = `{
  node(id: "@@@") {
    id
    ... on ProjectColumn {
      id
      cards(first: 10, after: "###") {
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
                assignees(first: 10) {
                  nodes {
                    login
                    name
                    id
                    url
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
