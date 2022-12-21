import moment from 'moment';

import GraphQLNode from '../GraphQLNode.js';

export default class Project extends GraphQLNode {
    constructor (data) {
        super(data);

        this._type = null;
        this._priority = null;
        this._assignee = null;

        this._plan = null;
        this._result = null;

        this._scope = null;
        this._cost = null;
        this._estimate = null;
        this._estimate_detail = null;
        this._estimate_description = null;
        this._purchase = null;
        this._phase = null;

        this.addAnotetionValue(data);

        this._issues = [];

        // const priority = [
        //     { code: 'c', label: '急' },
        //     { code: 'h', label: '高' },
        //     { code: 'n', label: '普' },
        //     { code: 'l', label: '低' },
        // ];

        // const types = [
        //     { code: '障害',       order: 1 },
        //     { code: 'リリース',   order: 2 },
        //     { code: '案件',       order: 3 },
        //     { code: '問い合せ',   order: 4 },
        //     { code: 'クラッシュ', order: 5 },
        //     { code: '改善',       order: 6 },
        // ];
    }
    assignee () {
        return this._assignee || null;
    }
    body () {
        return this._core.body || null;
    }
    bodyHTML () {
        return this._core.bodyHTML || null;
    }
    columns () {
        if (!this._core.columns)
            return [];

        return this._core.columns.nodes;
    }
    closedAt () {
        return this._core.closedAt || null;
    }
    closed () {
        return this._core.closed || null;
    }
    cost () {
        return this._cost || null;
    }
    estimate () {
        return this._estimate || null;
    }
    estimateDetail () {
        return this._estimate_detail || null;
    }
    estimateDescription () {
        return this._estimate_description || null;
    }
    number () {
        return this._core.number || null;
    }
    name () {
        return this._core.name || null;
    }
    url () {
        return this._core.url || null;
    }
    type () {
        return this._type || null;
    }
    plan () {
        return this._plan || null;
    }
    progress () {
        return this._core.progress || null;
    }
    purchase () {
        return this._purchase || null;
    }
    phase () {
        return this._phase || null;
    }
    priority () {
        return this._priority || null;
    }
    result () {
        return this._result || null;
    }
    state () {
        return this._core.state || null;
    }
    scope () {
        return this._scope || null;
    }
    issues () {
        return this._issues;
    }
    release () {
        return this._release || null;
    }
    addAnotetionValue (project) {
        const priority = (p) => {
            const ret = /.*@Priority:\s+(\S).*/.exec(p.body);

            if (!ret)
                return '?';

            const code = ret[1];

            const x = {
                'c': '急',  // Critical :  最高の優先度のユーザー・ジョブ。
                'h': '高',  // High : 高い優先度のユーザー・ジョブ。
                'n': '普',  // Normal : 通常の優先度のユーザー・ジョブ。
                'l': '低',  // Low : 低い優先度のユーザー・ジョブ。
                'w': '保',  // Wait: 待ち状態、保留中など
                '?': '未',  // 未確定
            }[code];

            if (!code)
                return '?';

            return code;
        };

        const assignee = (p) => {
            const ret = /.*@assignee:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const schedulePlan = (p) => {
            const ret = /.*@Plan:(\s+\d+-\d+-\d+),\s+(\d+-\d+-\d+).*/.exec(p.body)
                  || /.*@Plan:(\s+\d+-\d+-\d+)\s+(\d+-\d+-\d+).*/.exec(p.body);

            if (!ret)
                return { start: null, end: null };

            return { start: moment(ret[1]), end: moment(ret[2]) };
        };

        const scheduleResult = (p) => {
            const ret = /.*@Result:(\s+\d+-\d+-\d+),\s+(\d+-\d+-\d+).*/.exec(p.body)
                  || /.*@Result:(\s+\d+-\d+-\d+)\s+(\d+-\d+-\d+).*/.exec(p.body)
                  || /.*@Result:(\s+\d+-\d+-\d+),\s+(.+).*/.exec(p.body)
                  || /.*@Result:(\s+\d+-\d+-\d+)\s+(.+).*/.exec(p.body);

            if (!ret)
                return { start: null, end: null };

            const start = moment(ret[1]);
            const end   = moment(ret[2]);

            return { start: start, end: end.isValid() ? end : null };
        };

        const type = (p) => {
            const ret = /.*@Type:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const release = (p) => {
            const ret = /.*@Release:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const scope = (p) => {
            const ret = /.*@Scope:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const cost = (p) => {
            const ret = /.*@Cost:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const estimate = (p) => {
            const ret = /.*@Estimate:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const estimate_detail = (p) => {
            const ret = /.*@Estimate.Detail:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const estimate_description = (p) => {
            const ret = /.*@Estimate.Description:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const purchase = (p) => {
            const ret = /.*@Purchase:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        const phase = (p) => {
            const ret = /.*@Phase:\s+(\S+).*/.exec(p.body);

            return ret ? ret[1] : null;
        };

        this._type = type(project);
        this._priority = priority(project);
        this._assignee = assignee(project);

        this._plan = schedulePlan(project);
        this._result = scheduleResult(project);

        this._release = release(project);
        this._scope = scope(project);
        this._cost = cost(project);
        this._estimate = estimate(project);
        this._estimate_detail = estimate_detail(project);
        this._estimate_description = estimate_description(project);
        this._purchase = purchase(project);
        this._phase = phase(project);

        return project;
    }
    colorByPriority () {
        if (this.closed())
            return { background: 'none', color: '#333' };

        const priority = this.priority();

        const palette = {
            'c': { background: '#e83929', color: '#fff' },
            'h': { background: '#fcc800', color: '#333' },
            'n': { background: '#89c3eb', color: '#333' },
            'l': { background: '#dcdddd', color: '#333' },
            '?': { background: '#ffffff', color: '#333' },
        };

        return palette[priority];
    }
    priorityLabel () {
        const code = this.priority();

        const m = {
            'c': '急',  // Critical :  最高の優先度のユーザー・ジョブ。
            'h': '高',  // High : 高い優先度のユーザー・ジョブ。
            'n': '普',  // Normal : 通常の優先度のユーザー・ジョブ。
            'l': '低',  // Low : 低い優先度のユーザー・ジョブ。
            'w': '保',  // Wait: 待ち状態、保留中など
            '?': '未',  // 未確定
        };
        const label = m[code];
        if (!label)
            return '??';

        return label;
    }
}
