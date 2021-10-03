import moment from 'moment';

import Loader from './Loader.js';

import * as model from './models/index.js';

import Gtd from './Gtd.js';
import Scrum from './Scrum.js';
import ProductBacklogs from './ProductBacklogs.js';
import ProductBacklog from './ProductBacklog.js';
import Pool from './Pool.js';
import Pool2 from './Pool2.js';
import {Project} from './models/index.js';

const POOL = new Pool();
const POOL2 = new Pool2();

export default class Sogh extends Loader {
    constructor (token, options) {
        super(token);

        // TODO: options.labels で受け取る。
        this._labels = {
            meeging: null,
            waiting: null,
            release: null,
        };

        this._data = {
            viwer: {
                issues: {
                    pool: {ht:{}, list:[]},
                    fetch: {start: null, end: null},
                }
            },
            repositories: {},
            active: {
                repository: null,
                milestones: {ht:{}, list:[]},
                projects: {ht:{}, list:[]},
                labels: {ht:{}, list:[]},
                assignees: {ht:{}, list:[]},
            }
        };
    }
    // Active Data
    getRepository (owner, name) {
        const repos = this._data.repositories;

        if (!repos[owner]) return null;

        if (!repos[owner][name]) return null;

        return repos[owner][name].data;
    }
    active () {
        return this._data.active;
    }
    activeRepository (repo) {
        if (arguments.length > 0) {
            this._data.active = {
                repository: repo,
                projects:   {ht:{}, list:[]},
                milestones: {ht:{}, list:[]},
                assignees:  {ht:{}, list:[]},
                labels:     {ht:{}, list:[]},
            };

            const active = this._data.active;
            this.getMilestonesByRepository(repo, (l)=> active.milestones = POOL.list2Pool(l));
            this.getProjectsByRepository(repo,   (l)=> active.projects   = POOL.list2Pool(l));
            this.getAssigneesByRepository(repo,  (l)=> active.assignees  = POOL.list2Pool(l));
            this.getLabelsByRepository(repo,     (l)=> active.labels     = POOL.list2Pool(l));
        }

        return this._data.active.repository;
    }
    // from core
    issues2projects (issues) {
        const pool = { ht:{}, list: [] };
        const empyProject = () => {
            return {
                id: null,
                body: null,
                closedAt: null,
                createdAt: null,
                name: null,
                updatedAt: null,
                url: null,
                // issues: [],
                priority: 'l',
            };
        };

        for (const issue of issues) {
            if (issue.projectCards().length===0) {
                const project = new Project(empyProject());

                POOL2.addPool(project, pool);

                project.issues().push(issue);
            } else {
                const column = issue.projectCards()[0].column;

                if (!column) continue;

                const project = new Project(column.project);

                POOL2.addPool(project, pool);

                project.issues().push(issue);
            }
        }

        return pool;
    }
    issues2dueDates (issues) {
        const ht = {};
        const list = [];

        const dd = (v) => {
            if (!v)
                return null;

            const m = moment(v);

            if (!m.isValid())
                return null;

            return m.format('YYYY-MM-DD');
        };

        for (const issue of issues) {
            const key = dd(issue.closedAt || issue.due_date);

            if (!ht[key])
                ht[key] = [];

            ht[key].push(issue);
            list.push(issue);
        }

        return { list: list, ht: ht };
    }
    pointFromIssueBody (v) {
        const ret = /.*@Point:\s+(\d+).*/.exec(v);

        if (!ret) return '';

        return ret[1] * 1;
    }
    // ui utility
    priorityLabel (code) {
        const m = {
            c: '急',
            h: '高',
            n: '普',
            l: '低',
        };
        const label = m[code];
        if (!label)
            return '??';

        return label;
    }
    getFilterPriorities (projects) {
        const ht = {};

        for (const project of projects) {
            if (!ht[project.priority])
                ht[project.priority] = 1;
            else
                ht[project.priority] += 1;
        }

        const list = ['c', 'h', 'n', 'l'];
        const out = [];
        for (const k of list)
            if (k in ht)
                out.push({ code: k, count: ht[k] });

        return out;
    }
    defaultCardSize (project) {
        const m = {
            c: 'max',
            h: 'large',
            n: 'medium',
            l: 'small',
        };

        const p = m[project.priority];

        if (!p)
            return 'medium';

        return p;
    }
    calCardSize (size) {
        const columns = {
            max: 6,
            large: 4,
            medium: 2,
            small: 1,
        };

        const column = columns[size];

        const w = 111;
        const m = 22;

        return column * w + ((column - 1) * m);
    }
    // TODO: 廃棄予定
    sizingButtonColors (priority) {
        console.warn('Sogh.sizingButtonColors は廃止予定です。Project.colorByPriority を利用してください。');

        const m = {
            c: { background: 'rgba(232,  58,  42, 0.8)', color: '#fff' },
            h: { background: 'rgba(252, 200,   0, 0.8)', color: '#333' },
            n: { background: 'rgba(137, 195, 235, 0.8)', color: '#333' },
            l: { background: 'rgba(220, 221, 221, 0.8)', color: '#333' },
        };

        return m[priority];
    }
    sortProjectsByPriority (projects) {
        const v = (type) => {
            const m = {
                '障害': 1,
                'リリース': 2,
                '案件': 3,
                '問い合せ': 4,
                'クラッシュ': 5,
                '改善': 6,
            };
            let  n = m[type];

            if (!n)
                n = 999;

            return n;
        };

        const sorted_projects = projects.sort((a,b)=> v(a.type()) - v(b.type()));

        const x = { c: [], h: [], n: [], l: [], '?': [] };

        for (const project of sorted_projects) {
            const p = project.priority() || '?';

            x[p].push(project);
        }

        return [...x.c, ...x.h, ...x.n, ...x.l, ...x['?']];
    }
    sortIssuesByProjectAndPriority (issues) {
        const projects = {};

        for (const issue of issues) {
            const card = issue.projectCards();

            const project_id = issue.getFirstColumnProjectID();

            if (!projects[project_id]) {
                if (project_id) {
                    const tmp = {...card[0].column.project, ...{issues: []}};
                    projects[project_id] = tmp || { id: null, issues: [] };
                } else {
                    projects[project_id] =  {id: null, issues: [] };
                }

                projects[project_id] = new model.Project(projects[project_id]);
            }

            const project = projects[project_id];

            issue.project = project;

            project.issues().push(issue);
        }

        const x = this.sortProjectsByPriority(Object.values(projects));

        return x.reduce((list,d) => list.concat(d.issues()), []);
    }
    /////
    ///// summary issue
    /////
    summaryIssue (out, issue, project) {
        const point_plan   = issue.pointPlansTotal();
        const point_result = issue.pointResultTotal();

        /// gross
        out.gross.points.plan   += point_plan;
        out.gross.points.result += point_result;

        // priority
        const priority = project.priority();

        out.gross.priority[priority].plan   += point_plan;
        out.gross.priority[priority].result += point_result;

        // assignee
        const sumAssignee = (assignee, issue, count, out) => {
            if (!out[assignee.id])
                out[assignee.id] = {
                    assignee: assignee,
                    points: { plan: 0, result: 0 },
                    issues: { open: 0, close:  0 },
                };

            const data = out[assignee.id];

            if (point_plan)
                data.points.plan += point_plan / count;

            if (point_result)
                data.points.result += point_result / count;

            if (issue.closedAt)
                data.issues.close += 1;
            else
                data.issues.open += 1;
        };

        const assignees = issue.assignees();
        for (const assignee of assignees)
            sumAssignee(assignee, issue, assignees.length, out.assignees);

        if (issue.closedAt)
            out.gross.issues.close += 1;
        else
            out.gross.issues.open += 1;

        return out;
    }
    summaryIssues (out, project) {
        const issues = project.issues();

        return issues.reduce((out, issue)=>{
            this.summaryIssue(out, issue, project);
            return out;
        }, out);
    }
    summaryIssuesByProjects (projects) {
        const makeOut = () => {
            const x = { plan: 0, result: 0 };
            return {
                gross: {
                    points: {...x},
                    issues: { open: 0, close:  0 },
                    priority: { c: {...x}, h: {...x}, n: {...x}, l: {...x} },
                },
                assignees: {},
            };
        };

        return projects.reduce(
            (out, project)=> this.summaryIssues(out, project),
            makeOut());
    }
    /////
    scrum() {
        if (!this._scrum) {
            this._scrum = new Scrum();
            this._scrum._sogh = this;
        }

        return this._scrum;
    }
    gtd() {
        if (!this._gtd) {
            this._gtd = new Gtd();
            this._gtd._sogh = this;
        }

        return this._gtd;
    }
    productBacklogs() {
        if (!this._product_backlogs) {
            this._product_backlogs = new ProductBacklogs();
            this._product_backlogs._sogh = this;
        }

        return this._product_backlogs;
    }
    productBacklog() {
        if (!this._product_backlog) {
            this._product_backlog = new ProductBacklog();
            this._product_backlog._sogh = this;
        }

        return this._product_backlog;
    }
}
