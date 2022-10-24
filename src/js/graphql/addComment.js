const query = `mutation {
  addComment(input: {subjectId: "@subjectId", body: "@body", clientMutationId: "@clientMutationId"}) {
    clientMutationId
    commentEdge {
      node {
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
    }
    subject {
      id
      ... on Issue { id }
      ... on IpAllowListEntry { id }
      ... on HeadRefRestoredEvent { id }
      ... on HeadRefForcePushedEvent { id }
      ... on HeadRefDeletedEvent { id }
      ... on GistComment { id }
      ... on Gist { id }
      ... on ExternalIdentity { id }
      ... on Environment { id }
      ... on EnterpriseUserAccount { id }
      ... on EnterpriseServerUserAccountsUpload { id }
      ... on EnterpriseServerUserAccountEmail { id }
      ... on EnterpriseServerUserAccount { id }
      ... on EnterpriseServerInstallation { id }
      ... on EnterpriseRepositoryInfo { id }
      ... on EnterpriseIdentityProvider { id }
      ... on EnterpriseAdministratorInvitation { id }
      ... on Enterprise { id }
      ... on DraftIssue { id }
      ... on DiscussionPollOption { id }
      ... on DiscussionPoll { id }
      ... on DiscussionComment { id }
      ... on DiscussionCategory { id }
      ... on Discussion { id }
      ... on DisconnectedEvent { id }
      ... on DeploymentStatus { id }
      ... on DeploymentReview { id }
      ... on DeploymentEnvironmentChangedEvent { id }
      ... on Deployment { id }
      ... on DeployedEvent { id }
      ... on DeployKey { id }
      ... on DemilestonedEvent { id }
      ... on CrossReferencedEvent { id }
      ... on ConvertedToDiscussionEvent { id }
      ... on ConvertedNoteToIssueEvent { id }
      ... on ConvertToDraftEvent { id }
      ... on ConnectedEvent { id }
      ... on Comparison { id }
      ... on CommitCommentThread { id }
      ... on CommitComment { id }
      ... on Commit { id }
      ... on CommentDeletedEvent { id }
      ... on CodeOfConduct { id }
      ... on ClosedEvent { id }
      ... on CheckSuite { id }
      ... on CheckRun { id }
      ... on CWE { id }
      ... on BypassPullRequestAllowance { id }
      ... on BypassForcePushAllowance { id }
      ... on BranchProtectionRule { id }
      ... on Bot { id }
      ... on Blob { id }
      ... on BaseRefForcePushedEvent { id }
      ... on BaseRefDeletedEvent { id }
      ... on BaseRefChangedEvent { id }
      ... on AutomaticBaseChangeSucceededEvent { id }
      ... on AutomaticBaseChangeFailedEvent { id }
      ... on AutoSquashEnabledEvent { id }
      ... on AutoRebaseEnabledEvent { id }
      ... on AutoMergeEnabledEvent { id }
      ... on AutoMergeDisabledEvent { id }
      ... on AssignedEvent { id }
      ... on App { id }
      ... on AddedToProjectEvent { id }
    }
    timelineEdge {
      node {
        ... on AssignedEvent { id }
        ... on ClosedEvent { id }
        ... on Commit { id }
        ... on CrossReferencedEvent { id }
        ... on DemilestonedEvent { id }
        ... on UserBlockedEvent { id }
        ... on UnsubscribedEvent { id }
        ... on UnlockedEvent { id }
        ... on UnlabeledEvent { id }
        ... on UnassignedEvent { id }
        ... on TransferredEvent { id }
        ... on SubscribedEvent { id }
        ... on ReopenedEvent { id }
        ... on RenamedTitleEvent { id }
        ... on ReferencedEvent { id }
        ... on MilestonedEvent { id }
        ... on LockedEvent { id }
        ... on LabeledEvent { id }
        ... on IssueComment { id }
      }
    }
  }
}`;

export default query;
