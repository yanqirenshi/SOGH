export const pagenation = `after: "", first: 100`;

export const repository_key = `name: "@name", owner: "@owner"`;

export const user = `
id
login
name
url
email
avatarUrl
company
createdAt
updatedAt
`;

export const pullrequest = `
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
updatedAt
url
`;

export const milestone = `
id
url
number
title
dueOn
state
description
createdAt
updatedAt
closedAt
`;

export const project = `
id
name
url
updatedAt
state
number
createdAt
closedAt
body
bodyHTML
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
columns(first: 20) {
  nodes {
    id
    name
    url
    purpose
  }
}
`;
