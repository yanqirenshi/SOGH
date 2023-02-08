const query = `mutation {
  deleteIssueComment(input: {id: "@id", clientMutationId: "@clientMutationId"}) {
    clientMutationId
  }
}`;

export default query;
