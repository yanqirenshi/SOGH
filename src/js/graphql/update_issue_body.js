const query = `mutation {
  updateIssue(input:@issue-data) {
    issue {
      id
      url
      title
      createdAt
      closedAt
      updatedAt
      number
      body
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
              id
              number
              name
              body
              url
              createdAt
              updatedAt
              closedAt
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
}`;

export default query;
