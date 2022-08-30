const query = `{
  node(id: "@issue-id") {
    ... on Issue {
      id
      number
      title
      comments(orderBy: {field: UPDATED_AT, direction: DESC}, after: "", first: 100) {
        totalCount
        nodes {
          id
          url
          body
          bodyHTML
          resourcePath
          createdAt
          publishedAt
          lastEditedAt
          updatedAt
          minimizedReason
          isMinimized
          includesCreatedEdit
          databaseId
          createdViaEmail
          authorAssociation
          pullRequest {
            id
            number
            title
            url
          }
          author {
            avatarUrl
            login
            resourcePath
            url
          }
          editor {
            login
            url
            avatarUrl
            ... on User {
              id
              email
              login
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
