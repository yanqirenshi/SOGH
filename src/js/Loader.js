import * as model from './models/index.js';

import * as query from './GraphQL.js';
import GithubApiV3 from './GithubApiV3.js';
import GithubApiV4 from './GithubApiV4.js';

export default class Loader {
    constructor (token) {
        this._token = null;

        this._viewer = null;

        this.api = {
            v3: null,
            v4: null,
        };
    }
    viewer () {
        return this._viewer;
    }
    connect (token, success, error) {
        const api = new GithubApiV4(token);

        api.fetch(query.viwer, (results) => {
            const data = results.data;

            this._token = token;

            this._viewer = new model.Viewer(data.viewer);

            this.api.v3 = new GithubApiV3(token);
            this.api.v4 = api;

            success(this);
        }, (r) => {
            this._token = token;
            this._viewer = null;
            this.api.v3 = null;
            this.api.v4 = null;

            error(r, this);
        });
    }
    ensureEndCursor(query, endCursor) {
        if (endCursor)
            return query.replace('after: "",', `after: "${endCursor}",`);

        return query.replace('after: "",', '');
    }
    makeGraphQLDataItem (v) {
        if ("string"===(typeof v))
            return JSON.stringify(v);

        if (Array.isArray(v)) {
            if (v.length===0)
                return '[]';

            return '[' + v.map(d => this.makeGraphQLDataItem(d)).join(', ') + ']';
        }

        return v;
    }
    makeGraphQLData (data) {
        const keys = Object.keys(data);

        const x = keys.map(key => {
            const val = data[key];

            if (val===null)
                return null;

            const value = this.makeGraphQLDataItem(val);

            return key + ': ' + value;
        });

        return '{ ' + x.filter(d=>d!==null).join(', ') + ' }';
    }
    getIssuesByMilestone (milestone, cb_finished, cb_fetched, cb_error) {
        if (!this.api.v4._token)
            cb_finished([]);

        if (!milestone) return;

        const api = this.api.v4;

        const base_query = query.issues_by_milestone
              .replace('@milestone-id', milestone.id());

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(
                query,
                (results) => {
                    const data = results.data.node.issues;
                    const page_info = data.pageInfo;

                    const issues_tmp = [];
                    for(const node of data.nodes) {
                        const issue = new model.Issue(node);

                        issues.push(issue);
                        issues_tmp.push(issue);
                    }

                    if (cb_fetched)
                        cb_fetched(issues_tmp, issues);

                    if (page_info.hasNextPage)
                        getter(page_info.endCursor);
                    else
                        cb_finished(issues);
                },
                (error)=> cb_error && cb_error(error),
            );
        };

        getter();
    }
    getIssuesByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.issues;
                const page_info = data.pageInfo;

                for(const issue of data.nodes)
                    issues.push(new model.Issue(issue));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(issues);
            });
        };

        getter();
    }
    getIssuesOpenByRepository (repository, cb, cb2, cb_error) {
        if (!this.api.v4._token || !repository)
            cb([]);

        this._data.viwer.issues.fetch.start = new Date();
        this._data.viwer.issues.fetch.end = null;

        const api = this.api.v4;

        const base_query = query.issues_open_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(
                query,
                (results) => {
                    const data = results.data.repository.issues;
                    const page_info = data.pageInfo;

                    const tmp = [];
                    for(const issue of data.nodes) {
                        const obj = new model.Issue(issue);
                        tmp.push(obj);
                        issues.push(obj);
                    }

                    if (cb2)
                        cb2(tmp, page_info);

                    if (page_info.hasNextPage)
                        getter(page_info.endCursor);
                    else {
                        this._data.viwer.issues.fetch.end = new Date();

                        this._data.viwer.issues.pool.list = issues;

                        cb(issues);
                    }
                },
                (error) => {
                    if (cb_error)
                        cb_error(error);
                });
        };

        getter();
    }
    getIssuesOpenByRepositoryAndViewer (repository, viewer, cb) {
        console.warn('このメソッドは利用しないでください。\nGtd.getIssuesOpenByRepository の内容で置きかえる予定です。');
        if (!this.api.v4._token || !repository)
            cb([]);

        this._data.viwer.issues.fetch.start = new Date();
        this._data.viwer.issues.fetch.end = null;

        const api = this.api.v4;

        const base_query = query.issues_open_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        const isViewer = (issue) => issue.assignees.nodes.find(d=>d.id===viewer.id());

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.issues;
                const page_info = data.pageInfo;

                for(const issue of data.nodes)
                    if (isViewer(issue))
                        issues.push(new model.Issue(issue));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else {
                    this._data.viwer.issues.fetch.end = new Date();

                    this._data.viwer.issues.pool.list = issues;

                    cb(issues);
                }
            });
        };

        getter();
    }
    getIssuesOpenByLabel (repository, label_name, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_open_by_label
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name())
              .replace('@label_name', label_name);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                if (!results.data.repository.label) {
                    cb([]);
                } else {
                    const data = results.data.repository.label.issues;
                    const page_info = data.pageInfo;

                    for(const issue of data.nodes)
                        issues.push(new model.Issue(issue));

                    if (page_info.hasNextPage)
                        getter(page_info.endCursor);
                    else
                        cb(issues);
                }
            });
        };

        getter();
    }
    getIssuesByReportLabel (repository, cb) {
        if (!this.api.v4._token)
            cb([]);

        if (!repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_by_report_label
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const label = results.data.repository.label;

                if (!label)
                    return cb([]);

                const data = label.issues;
                const page_info = data.pageInfo;

                for(const issue of data.nodes)
                    issues.push(new model.Issue(issue));

                if (page_info.hasNextPage)
                    return getter(page_info.endCursor);
                else
                    return cb(issues);
            });
        };

        getter();
    }
    getIssuesByRepositoryProject (repository, project, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_by_repository
              .replace('issues(after: "", first: 100)', 'issues(after: "", first: 100, states: OPEN)')
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.issues;
                const page_info = data.pageInfo;

                const isTarget = (cards) => {
                    for (const card of cards) {
                        if (card.column.project.id===project.id)
                            return true;
                    }

                    return false;
                };

                data.nodes.reduce((list, d) => {
                    if (isTarget(d.projectCards.nodes))
                        list.push(new model.Issue(d));

                    return list;
                }, issues);

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(issues);
            });
        };

        getter();
    }
    getIssuesByViwer (cb) {
        if (!this.api.v4._token)
            return cb([]);

        this._data.viwer.issues.fetch.start = new Date();
        this._data.viwer.issues.fetch.end = null;

        const api = this.api.v4;

        const base_query = query.issues_by_viwer;

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.viewer.issues;
                const page_info = data.pageInfo;

                for(const issue of data.nodes)
                    issues.push(new model.Issue(issue));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else {
                    this._data.viwer.issues.fetch.end = new Date();

                    this._data.viwer.issues.pool.list = issues;

                    cb(issues);
                }
            });
        };

        getter();

        return this;
    }
    getIssuesByProjectColumn (column, cb) {
        if (!this.api.v4._token)
            cb([]);

        if (!column)
            cb([]);

        const api = this.api.v4;

        const base_query = query.issues_open_by_project_column
              .replace('@column-id', column.id);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const cards = results.data.node.cards;

                if (!cards)
                    return cb([]);

                cards.edges.reduce((list, d) => {
                    const issue = d.node.content;

                    if (issue && issue.id)
                        list.push(new model.Issue(issue));

                    return list;
                }, issues);

                const page_info = cards.pageInfo;

                if (page_info.hasNextPage)
                    return getter(page_info.endCursor);
                else
                    return cb(issues);
            });
        };

        getter();
    }
    getMilestonesByID (id, cb) {
        if (!this.api.v4._token || !id)
            cb(null);

        const api = this.api.v4;

        const base_query = query.milestone_by_id
              .replace('@id', id);

        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                cb(new model.Milestone({...results.data.node}));
            });
        };

        getter();
    }
    getMilestonesByRepositoryAndNumber (owner, repo_name, number, cb) {
        if (!this.api.v4._token || !owner || !repo_name || !number)
            cb(null);

        const api = this.api.v4;

        const base_query = query.milestone_by_repository_and_number
              .replace('@milestone_number', number)
              .replace('@name', repo_name)
              .replace('@owner', owner);

        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                cb(new model.Milestone(
                    {...results.data.repository.milestone}
                ));
            });
        };

        getter();
    }
    getMilestonesByRepository (repository, cb) {
        if (!this.api.v4._token)
            cb([]);

        const api = this.api.v4;

        const base_query = query.milestone_by_reposigory
              .replace('@owner', repository.owner().login)
              .replace('@name',  repository.name());

        let milestones = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.milestones;
                const page_info = data.pageInfo;

                milestones = milestones.concat(data.nodes.map(d=>new model.Milestone(d)));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(milestones);
            });
        };

        getter();
    }
    getProjectByID (id, cb) {
        if (!this.api.v4._token || !id)
            cb(null);

        const api = this.api.v4;

        const base_query = query.project_by_id
              .replace('@id', id);

        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                cb(new model.Project({...results.data.node}));
            });
        };

        getter();
    }
    getProjectsByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.projects_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let projects = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.projects;
                const page_info = data.pageInfo;

                projects = projects.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(projects.map(d=>new model.Project(d)));
                }
            });
        };

        getter();
    }
    getProjectsOpenByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.projects_open_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let projects = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.projects;
                const page_info = data.pageInfo;

                projects = projects.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(projects.map(d=>new model.Project(d)));
                }
            });
        };

        getter();
    }
    getProjectsCloseByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.projects_close_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let projects = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.projects;
                const page_info = data.pageInfo;

                projects = projects.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(projects.map(d=>new model.Project(d)));
                }
            });
        };

        getter();
    }
    getAssigneesByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.assignees_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let assignees = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.assignableUsers;
                const page_info = data.pageInfo;

                assignees = assignees.concat(data.nodes.map(d=>new model.Assignee(d)));

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(assignees);
                }
            });
        };

        getter();
    }
    getLabelsByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.labels_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let labels = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.labels;
                const page_info = data.pageInfo;

                labels = labels.concat(data.nodes.map(d=>new model.Label(d)));

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(labels);
                }
            });
        };

        getter();
    }
    createIssue (data, cb_success, cb_error) {
        if (!this.api.v4._token || !data)
            cb_success(null);

        const api = this.api.v4;

        const q = query.create_issue
              .replace('@issue-data', this.makeGraphQLData(data));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    closeIssue (data, cb_success, cb_error) {
        if (!this.api.v4._token || !data)
            cb_success(null);

        const api = this.api.v4;

        const q = query.close_issue
              .replace('@issue-data', this.makeGraphQLData(data));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    reopenIssue (data, cb_success, cb_error) {
        if (!this.api.v4._token || !data)
            cb_success(null);

        const api = this.api.v4;

        const q = query.reopen_issue
              .replace('@issue-data', this.makeGraphQLData(data));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    updateIssue (update_issue_input, cb_success, cb_error) {
        if (!this.api.v4._token || !update_issue_input)
            cb_success(null);

        const api = this.api.v4;

        const q = query.update_issue_body
              .replace('@issue-data', this.makeGraphQLData(update_issue_input));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    updateIssueBody (issue, cb_success, cb_error) {
        if (!this.api.v4._token || !issue)
            cb_success(null);

        const api = this.api.v4;

        const q = query.update_issue_body
              .replace('@issue-data', this.makeGraphQLData({
                  id: issue.id(),
                  body: issue.body(),
              }));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    updateIssueMilestone (issue, milestoneId, cb_success, cb_error) {
        if (!this.api.v4._token || !issue)
            cb_success(null);

        const api = this.api.v4;

        const q = query.update_issue_body
              .replace('@issue-data', this.makeGraphQLData({
                  id: issue.id(),
                  milestoneId: milestoneId,
              }));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    updateIssueProjects (issue, projectIds, cb_success, cb_error) {
        if (!this.api.v4._token || !issue)
            cb_success(null);

        const api = this.api.v4;

        const q = query.update_issue_body
              .replace('@issue-data', this.makeGraphQLData({
                  id: issue.id(),
                  projectIds: projectIds,
              }));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    updateIssueAssignees (issue, assigneeIds, cb_success, cb_error) {
        if (!this.api.v4._token || !issue)
            cb_success(null);

        const api = this.api.v4;

        const q = query.update_issue_body
              .replace('@issue-data', this.makeGraphQLData({
                  id: issue.id(),
                  assigneeIds: assigneeIds,
              }));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    updateIssueLabelIds (issue, labelIds, cb_success, cb_error) {
        if (!this.api.v4._token || !issue)
            cb_success(null);

        const api = this.api.v4;

        const q = query.update_issue_body
              .replace('@issue-data', this.makeGraphQLData({
                  id: issue.id(),
                  labelIds: labelIds,
              }));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    updateIssue4request (issue, assigneeIds, cb_success, cb_error) {
        if (!this.api.v4._token || !issue)
            cb_success(null);

        const api = this.api.v4;

        const q = query.update_issue_body
              .replace('@issue-data', this.makeGraphQLData({
                  id: issue.id(),
                  body: issue.body(),
                  assigneeIds: assigneeIds,
              }));

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => { if (cb_success) cb_success(results); },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    fetchRepositories (owner, name, cb) {
        if (!this.api.v4._token || !owner || !name)
            cb(null);

        const api = this.api.v4;

        const base_query = query.repository
              .replace('@owner', owner)
              .replace('@name', name);

        const addReop = (success, data) => {
            const repos = this._data.repositories;

            if (!repos[owner])
                repos[owner] = {};

            repos[owner][name] = {
                data:  success ? new model.Repository(data) : null,
                valid: success,
                error: success ? null : data,
            };
        };

        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                if (results.errors)
                    addReop(false, results.errors);
                else
                    addReop(true, results.data.repository);

                if (cb) cb(!results.errors);
            });
        };

        getter();
    }
    fetchIssuesByProject (project, cb_success) {
        if (!project) return;

        const columns = project.columns();

        const progress = columns.reduce((ht,d)=>{
            ht[d.id] = null;
            return ht;
        }, {});

        let issues = [];

        for (const column of columns)
            this.getIssuesByProjectColumn(column, (ret)=> {
                issues = issues.concat(ret);

                progress[column.id] = new Date();

                const is_finished = Object.values(progress).indexOf(null)===-1;

                if (is_finished)
                    cb_success(issues);
            });
    }
    getIssueByIssueId (id, cb) {
        if (!this.api.v4._token || !id)
            cb(null);

        const api = this.api.v4;

        const base_query = query.issue_by_issue_id
              .replace('@issue-id', id);

        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                cb(new model.Issue({...results.data.node}));
            });
        };

        getter();
    }
    getIssuesCommentsByIssueId (issue_id, cb) {
        if (!this.api.v4._token, !issue_id) {
            cb([]);
            return;
        }

        const api = this.api.v4;

        const base_query = query.issue_comments_by_issue_id
              .replace('@issue-id', issue_id);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.node.comments;
                const page_info = data.pageInfo;

                for(const comment of data.nodes)
                    issues.push(new model.IssueComment(comment));

                if (page_info.hasNextPage)
                    getter(page_info.endCursor);
                else
                    cb(issues);
            });
        };

        getter();
    }
    fetchPullrequestsByRepository (repository, cb) {
        if (!this.api.v4._token || !repository)
            cb([]);

        const api = this.api.v4;

        const base_query = query.pullrequests_by_repository
              .replace('@owner', repository.owner().login)
              .replace('@name', repository.name());

        let list = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.pullRequests;
                const page_info = data.pageInfo;

                list = list.concat(data.nodes.map(d=>new model.PullRequests(d)));

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(list);
                }
            });
        };

        getter();
    }
    addComment (subject_id, body, client_mutation_id, cb_success, cb_error) {
        if (!this.api.v4._token || !body || !subject_id)
            cb_success(null);

        const api = this.api.v4;

        const q = query.addComment
              .replace('@subjectId', subject_id)
              .replace('@body', body)
              .replace('@clientMutationId', client_mutation_id);

        const getter = (endCursor) => {
            api.fetch(
                q,
                (results) => {
                    if (!cb_success)
                        return;

                    cb_success({
                        comment: new model.IssueComment(results.data.addComment.commentEdge.node),
                        subject: results.data.addComment.subject,
                        timelineEdge: results.data.addComment.timelineEdge,
                    });
                },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    deleteComment (id, client_mutation_id, cb_success, cb_error) {
        if (!this.api.v4._token || !id)
            cb_success(null);

        const api = this.api.v4;

        const getter = (endCursor) => {
            api.fetch(
                query.deleteIssueComment
                    .replace('@id', id)
                    .replace('@clientMutationId', client_mutation_id),
                (results) => {
                    if (!cb_success)
                        return;

                    cb_success({
                        id: id,
                        client_mutation_id: client_mutation_id,
                    });
                },
                (error)   => { if (cb_error)   cb_error(error); },
            );
        };

        getter();
    }
    /** **************************************************************** *
     * Search
     * **************************************************************** */
    searchIssues  (query_in, fn1, fn2, fn3)  {
        let cb_success_all, cb_success_onetime, cb_error;
        if (arguments.length===4) {
            cb_success_onetime = fn1;
            cb_success_all = fn2;
            cb_error = fn3;
        } else {
            cb_success_all = fn1;
            cb_error = fn2;
        }

        if (!this.api.v4._token || !query)
            cb_success_all([]);

        const api = this.api.v4;

        const base_query = query.search_issues
              .replace('@QUERY', query_in);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(
                query,
                (results) => {
                    if ('errors' in results) {
                        cb_error({
                            errors: results.errors,
                            issues: [],
                        });
                        return;
                    }

                    const data = results.data.search.edges;
                    const page_info = results.data.search.pageInfo;

                    const new_issues = data.map(d=> new model.Issue(d.node));

                    if (cb_success_onetime)
                        cb_success_onetime(new_issues);

                    issues = issues.concat(new_issues);

                    if (page_info.hasNextPage) {
                        // 次のデータが存在する場合
                        getter(page_info.endCursor);
                    } else {
                        // 終り
                        cb_success_all(issues);
                    }
                },
                (error) => {
                    if (cb_error)
                        cb_error({
                            errors: error,
                            issues: [],
                        });
                });
        };

        getter();
    }
    // searchIssues  (query_in, cb_success, cb_error)  {
    //     if (!this.api.v4._token || !query)
    //         cb_success([]);

    //     const api = this.api.v4;

    //     const base_query = query.search_issues
    //           .replace('@QUERY', query_in);

    //     let issues = [];
    //     const getter = (endCursor) => {
    //         let query = this.ensureEndCursor(base_query, endCursor);

    //         api.fetch(query, (results) => {
    //             if ('errors' in results) {
    //                 cb_error({
    //                     errors: results.errors,
    //                     issues: [],
    //                 });
    //                 return;
    //             }

    //             const data = results.data.search.edges;
    //             const page_info = results.data.search.pageInfo;

    //             issues = issues.concat(data.map(d=> new model.Issue(d.node)));

    //             if (page_info.hasNextPage) {
    //                 // 次のデータが存在する場合
    //                 getter(page_info.endCursor);
    //             } else {
    //                 // 終り
    //                 cb_success(issues);
    //             }
    //         });
    //     };

    //     getter();
    // }
    /** **************************************************************** *
     * Search
     * **************************************************************** */
    submitQuery (query, cb_finished) {
        if (!this.api.v4._token || !query) {
            cb_finished([]);
            return;
        }

        const api = this.api.v4;

        const base_query = query;

        api.fetch(query, (results)=> cb_finished(results));
    }
}
