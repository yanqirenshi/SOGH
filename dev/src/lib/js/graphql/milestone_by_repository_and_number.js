import * as attr from './attributes.js';

const query = `{
  repository (${attr.repository_key}) {
    milestone (number: @milestone_number) {
      ${attr.milestone}
      repository {
        ${attr.repository}
        owner {
          ${attr.owner}
        }
      }
    }
  }
}
`;

export default query;
