// https://docs.github.com/en/graphql/overview/explorer

import addComment from './graphql/addComment.js';
import assignees_by_repository from './graphql/assignees_by_repository.js';
import close_issue from './graphql/close_issue.js';
import create_issue from './graphql/create_issue.js';
import deleteIssueComment from './graphql/deleteIssueComment.js';
import issue_by_issue_id from './graphql/issue_by_issue_id.js';
import issue_comments_by_issue_id from './graphql/issue_comments_by_issue_id.js';
import issues_by_milestone from './graphql/issues_by_milestone.js';
import issues_by_report_label from './graphql/issues_by_report_label.js';
import issues_by_repository from './graphql/issues_by_repository.js';
import issues_by_viwer from './graphql/issues_by_viwer.js';
import issues_open_by_label from './graphql/issues_open_by_label.js';
import issues_open_by_project_column from './graphql/issues_open_by_project_column.js';
import issues_open_by_repository from './graphql/issues_open_by_repository.js';
import labels_by_repository from './graphql/labels_by_repository.js';
import milestone_by_id from './graphql/milestone_by_id.js';
import milestone_by_reposigory from './graphql/milestones_by_repository.js';
import project_by_id from './graphql/project_by_id.js';
import projects_by_repository from './graphql/projects_by_repository.js';
import projects_close_by_repository from './graphql/projects_close_by_repository.js';
import projects_open_by_repository from './graphql/projects_open_by_repository.js';
import pullrequests_by_repository from './graphql/pullrequests_by_repository.js';
import reopen_issue from './graphql/reopen_issue.js';
import repository from './graphql/repository.js';
import search_issues from './graphql/search_issues.js';
import update_issue_body from './graphql/update_issue_body.js';
import viwer from './graphql/viwer.js';
export {default as milestone_by_repository_and_number} from './graphql/milestone_by_repository_and_number.js';

export {
    addComment,
    assignees_by_repository,
    close_issue,
    create_issue,
    deleteIssueComment,
    issue_by_issue_id,
    issue_comments_by_issue_id,
    issues_by_milestone,
    issues_by_report_label,
    issues_by_repository,
    issues_by_viwer,
    issues_open_by_label,
    issues_open_by_project_column,
    issues_open_by_repository,
    labels_by_repository,
    milestone_by_id,
    milestone_by_reposigory,
    project_by_id,
    projects_by_repository,
    projects_close_by_repository,
    projects_open_by_repository,
    pullrequests_by_repository,
    reopen_issue,
    repository,
    search_issues,
    update_issue_body,
    viwer,
}
