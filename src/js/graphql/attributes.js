export const pagenation = `after: "", first: 100`;

export const repository_key = `name: "@name", owner: "@owner"`;

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
number
name
url
body
bodyHTML
state
closed
updatedAt
createdAt
closedAt
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

export const project2 = `
id
number
name
url
body
bodyHTML
state
closed
updatedAt
createdAt
closedAt
progress {
  todoPercentage
  todoCount
  inProgressPercentage
  inProgressCount
  enabled
  donePercentage
  doneCount
}
`;

export const project_card = `
id
url
note
state
isArchived
`;

export const project_column = `
id
name
url
purpose
`;

export const repository = `
id
name
url
`;

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

export const label = `
id
name
url
color
createdAt
updatedAt
`;

export const issue = `
id
url
title
createdAt
closedAt
updatedAt
number
body
bodyHTML
state
`;

export const page_info = `
hasNextPage
endCursor
`;
