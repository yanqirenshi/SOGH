const query = `{
  node(id: "@id") {
    ... on Project {
      id
      name
      number
      url
      progress {
        todoPercentage
        todoCount
        inProgressPercentage
        inProgressCount
        enabled
        donePercentage
        doneCount
      }
      columns(first: 100) {
        nodes {
          id
          name
          url
          purpose
        }
      }
    }
  }
}`;

export default query;
