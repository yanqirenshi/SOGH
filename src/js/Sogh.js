import {
    milestone_by_reposigory,
    issues_by_milestone,
}from './GraphQL.js';

class GithubApiV3 {
    makeHeader (api) {
        return {
            'Authorization': `bearer ${api.__auth.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }
    postData (api, query) {
        return {
            method: 'POST',
            headers: this.makeHeader(api),
            body: JSON.stringify({query: query})
        };
    }
    fetch (api, query, cb) {
        const endpoint = 'https://api.github.com/graphql';

        fetch(endpoint, this.postData(api, query))
            .then(response => response.json())
            .then(cb);
    }
}


class GithubApiV4 {
    constructor (token) {
        this._token = token;
    }
    token (api_or_token) {
        if ((typeof api_or_token)==="string")
            return api_or_token;
        else
            return api_or_token.__auth.token;
    }
    makeHeader (api_or_token) {
        return {
            'Authorization': `bearer ${this.token(api_or_token)}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }
    postData (api_or_token, query) {
        return {
            method: 'POST',
            headers: this.makeHeader(api_or_token),
            body: JSON.stringify({query: query})
        };
    }
    fetch (query, cb) {
        const endpoint = 'https://api.github.com/graphql';

        fetch(endpoint, this.postData(this._token, query))
            .then(response => response.json())
            .then(cb);
    }
}


export default class Sogh {
    constructor (token) {
        this._token = token || null;

        this.api = {
            v3: new GithubApiV3(this._token),
            v4: new GithubApiV4(this._token),
        };
    }
    ensureEndCursor(query, endCursor) {
        if (endCursor)
            return query.replace('after: "",', `after: "${endCursor}",`);

        return query.replace('after: "",', '');
    }
    getMilestonesByRepository (repository, cb) {
        if (!this.api.v4._token)
            cb([]);

        const api = this.api.v4;

        const base_query = milestone_by_reposigory
              .replace('@owner', repository.owner)
              .replace('@name',  repository.name);

        let milestones = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.repository.milestones;
                const page_info = data.pageInfo;

                milestones = milestones.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(milestones);
                }
            });
        };

        getter();
    }
    point (v) {
        const ret = /.*@Point:\s+(\d+).*/.exec(v);

        if (!ret) return '';

        return ret[1] * 1;
    }
    getIssuesByMilestone (milestone, cb) {
        if (!this.api.v4._token)
            cb([]);

        if (!milestone) return;

        const api = this.api.v4;

        const base_query = issues_by_milestone
              .replace('@milestone-id', milestone.id);

        let issues = [];
        const getter = (endCursor) => {
            let query = this.ensureEndCursor(base_query, endCursor);

            api.fetch(query, (results) => {
                const data = results.data.node.issues;
                const page_info = data.pageInfo;

                issues = issues.concat(data.nodes);

                if (page_info.hasNextPage) {
                    getter(page_info.endCursor);
                } else {
                    cb(issues.map(d => {
                        d.point = this.point(d.body);
                        return d;
                    }));
                }
            });
        };

        getter();
    }
}
