import React, { useState, useEffect } from 'react';

import Sogh from '@yanqirenshi/sogh';

import RootPc from './RootPc.js';

function App() {
    const [token] = useState(process.env.REACT_APP_GITHUB_PARSONAL_TOKEN);
    const [owner] = useState(process.env.REACT_APP_GITHUB_REPOSITORY_OWNER);
    const [repo_neme] = useState(process.env.REACT_APP_GITHUB_REPOSITORY_NAME);
    const [sogh, setSogh] = useState(null);
    const [repo, setRepo] = useState(null);

    useEffect(() => {
        new Sogh().connect(token,
                           (sogh) => setSogh(sogh),
                           () => console.error('Sign In Error: SOGH Error'));
    }, [token]);

    useEffect(() => {
        if (!sogh) return;

        sogh.fetchRepository(owner, repo_neme, (success) => {
            setRepo(sogh.getRepository(owner, repo_neme));
        });
    }, [sogh, owner, repo_neme]);

    return (<RootPc sogh={sogh} repo={repo} />);
}

export default App;
