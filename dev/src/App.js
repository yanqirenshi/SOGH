import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import 'react-bulma-components/dist/react-bulma-components.min.css';

import SignIn from './components/SignIn.js';

import PageHome from './PageHome.js';
import PageProductBacklog from './PageProductBacklog.js';

import { connectGithub } from './actions/sogh.js';

function App(props) {
    const [token] = useState(process.env.REACT_APP_GITHUB_PARSONAL_TOKEN || null);
    const [owner] = useState(process.env.REACT_APP_GITHUB_REPOSITORY_OWNER || null);
    const [name]  = useState(process.env.REACT_APP_GITHUB_REPOSITORY_NAME || null);
    const [updated_at, setUpdatedAt] = useState(null);

    const sogh = props.sogh;

    useEffect(() => props.connectGithub(token), [token]);

    useEffect(() => {
        if (!sogh) return;

        sogh.fetchRepository(owner, name, (success) => {
            const repo = sogh.getRepository(owner, name);
            sogh.activeRepository(repo);
            setUpdatedAt(new Date());
        });
    }, [sogh]);

    const connectGithub = (token) => props.connectGithub(token);

    return (
        <>
          <span>{!!updated_at}</span>
          {!(token || sogh) && <SignIn callback={connectGithub}/>}

          <Router>
            <Switch>
              <Route exact path='/' component={PageHome}/>
              <Route exact path='/product-backlogs/:id' component={PageProductBacklog} />
            </Switch>
          </Router>
        </>
    );
}

export default connect(
    (state) => {
        return { sogh: state.sogh };
    },
    (dispatch) => ({
        connectGithub: (token) => dispatch(connectGithub(token)),
    }),
)(App);
