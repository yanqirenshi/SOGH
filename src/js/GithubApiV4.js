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
    fetch (query, success, error) {
        const endpoint = 'https://api.github.com/graphql';

        fetch(endpoint, this.postData(this._token, query))
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    return Promise.reject(response);
            })
            .then(data => {
                if (success)
                    success(data);
            })
            .catch(err => {
                if (error)
                    error(err);
                else
                    console.error(err);
            });
    }
}
