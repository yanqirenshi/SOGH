export default class GithubApiV3 {
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
