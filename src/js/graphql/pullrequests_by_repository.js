const query = `{
  repository(name: "@name", owner: "@owner") {
    pullRequests(states: OPEN, first: 10) {
      nodes {
        activeLockReason
        additions
        authorAssociation
        baseRefName
        baseRefOid
        body
        bodyHTML
        changedFiles
        checksResourcePath
        checksUrl
        closed
        closedAt
        createdAt
        createdViaEmail
        databaseId
        deletions
        id
        includesCreatedEdit
        isCrossRepository
        isDraft
        isReadByViewer
        lastEditedAt
        locked
        maintainerCanModify
        mergeable
        merged
        mergedAt
        number
        publishedAt
        resourcePath
        revertResourcePath
        revertUrl
        reviewDecision
        state
        title
        titleHTML
        updatedAt
        url
        assignees(first: 10) {
          nodes {
            avatarUrl
            id
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
`;

export default query;
