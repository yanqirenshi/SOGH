// https://docs.github.com/en/graphql/overview/explorer

import viwer from './graphql/viwer.js';
import milestone_by_reposigory from './graphql/milestones_by_repository.js';
import issues_by_milestone from './graphql/issues_by_milestone.js';
import issues_by_repository from './graphql/issues_by_repository.js';
import issues_by_report_label from './graphql/issues_by_report_label.js';
import issues_by_viwer from './graphql/issues_by_viwer.js';
import projects_by_repository from './graphql/projects_by_repository.js';
import project_by_id from './graphql/project_by_id.js';

export {
    viwer,
    milestone_by_reposigory,
    issues_by_milestone,
    issues_by_repository,
    issues_by_report_label,
    issues_by_viwer,
    projects_by_repository,
    project_by_id,
}
