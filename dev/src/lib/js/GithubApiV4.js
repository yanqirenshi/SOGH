export default class GithubApiV4 {
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
