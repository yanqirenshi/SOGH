// , states: OPEN
const query = `{
  repository(name: "@name", owner: "@owner") {
    projects(after: "", first: 100) {
      nodes {
        url
        updatedAt
        state
        number
        name
        id
        createdAt
        closedAt
        body
        closed
        progress {
          todoPercentage
          todoCount
          inProgressPercentage
          inProgressCount
          enabled
          donePercentage
          doneCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;

export default query;
