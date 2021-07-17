// import Column from './Column.js';
// import Label  from './Label.js';

import GraphQLNode from './GraphQLNode.js';

export default class Project extends GraphQLNode {
    constructor (data) {
        super(data);

        this._data = data;

        const priority = [
            { code: 'c', label: '急' },
            { code: 'h', label: '高' },
            { code: 'n', label: '普' },
            { code: 'l', label: '低' },
        ];

        const types = [
            { code: '障害',       order: 1 },
            { code: 'リリース',   order: 2 },
            { code: '案件',       order: 3 },
            { code: '問い合せ',   order: 4 },
            { code: 'クラッシュ', order: 5 },
            { code: '改善',       order: 6 },
        ];
    }
}
