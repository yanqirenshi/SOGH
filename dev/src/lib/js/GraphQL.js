// https://docs.github.com/en/graphql/overview/explorer

import milestone_by_reposigory from './graphql/milestones_by_repository.js';
import issues_by_milestone from './graphql/issues_by_milestone.js';
import issues_by_repository from './graphql/issues_by_repository.js';
import issues_by_report_label from './graphql/issues_by_report_label.js';
import projects_by_repository from './graphql/projects_by_repository.js';
import project_by_id from './graphql/project_by_id.js';

export {
    milestone_by_reposigory,
    issues_by_milestone,
    issues_by_repository,
    projects_by_repository,
    issues_by_report_label,
    project_by_id,
}
