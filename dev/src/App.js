import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import 'react-bulma-components/dist/react-bulma-components.min.css';

import SignIn from './components/SignIn.js';

import PageHome from './PageHome.js';
import PageProductBacklog from './PageProductBacklog.js';

import { connectGithub } from './actions/sogh.js';

function App(props) {
    const [token, setToken] = useState(process.env.REACT_APP_GITHUB_PARSONAL_TOKEN || null);

    useEffect(() => props.connectGithub(token), [token]);

    const connectGithub = (token) => props.connectGithub(token);

    return (
        <>
          {!(token || props.sogh) && <SignIn callback={connectGithub}/>}

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
