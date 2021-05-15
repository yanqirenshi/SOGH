// https://docs.github.com/en/graphql/overview/explorer

import issues_by_milestone from './graphql/issues_by_milestone.js';
import issues_by_report_label from './graphql/issues_by_report_label.js';
import issues_by_repository from './graphql/issues_by_repository.js';
import issues_by_viwer from './graphql/issues_by_viwer.js';
import issues_open_by_project_column from './graphql/issues_open_by_project_column.js';
import issues_open_by_repository from './graphql/issues_open_by_repository.js';
import milestone_by_reposigory from './graphql/milestones_by_repository.js';
import projects_by_repository from './graphql/projects_by_repository.js';
import assignees_by_repository from './graphql/assignees_by_repository.js';
import labels_by_repository from './graphql/labels_by_repository.js';
import project_by_id from './graphql/project_by_id.js';
import repository from './graphql/repository.js';
import viwer from './graphql/viwer.js';
import create_issue from './graphql/create_issue.js';

export {
    issues_by_milestone,
    issues_by_report_label,
    issues_by_repository,
    issues_by_viwer,
    issues_open_by_project_column,
    issues_open_by_repository,
    milestone_by_reposigory,
    projects_by_repository,
    assignees_by_repository,
    labels_by_repository,
    project_by_id,
    repository,
    viwer,
    create_issue,
}
