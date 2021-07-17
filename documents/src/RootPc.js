import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GrobalOperators from './components/GrobalOperators.js';

import Home from './pages/Home.js';
import Backlog from './pages/Backlog.js';
import * as Classes from './classes/index.js';

function Root (props) {
    return (
        <>
          <GrobalOperators />
          <Router>
            <Route exact path='/'>
              <Home sogh={props.sogh} repo={props.repo}/>
            </Route>

            <Route exact path='/backlogs/:backlog_id'>
              <Backlog sogh={props.sogh} repo={props.repo}/>
            </Route>

            <Route exact path='/classes/1010000' component={Classes.P1010000} />
            <Route exact path='/classes/1010001' component={Classes.P1010001} />
            <Route exact path='/classes/1010002' component={Classes.P1010002} />
            <Route exact path='/classes/1010003' component={Classes.P1010003} />
            <Route exact path='/classes/1010004' component={Classes.P1010004} />
            <Route exact path='/classes/1010005' component={Classes.P1010005} />
            <Route exact path='/classes/1010006' component={Classes.P1010006} />
            <Route exact path='/classes/1010007' component={Classes.P1010007} />
            <Route exact path='/classes/1010008' component={Classes.P1010008} />
            <Route exact path='/classes/1010009' component={Classes.P1010009} />
            <Route exact path='/classes/1010010' component={Classes.P1010010} />
            <Route exact path='/classes/1010011' component={Classes.P1010011} />
            <Route exact path='/classes/1010012' component={Classes.P1010012} />
            <Route exact path='/classes/1010013' component={Classes.P1010013} />
            <Route exact path='/classes/1010014' component={Classes.P1010014} />
            <Route exact path='/classes/1010015' component={Classes.P1010015} />
          </Router>
        </>
    );
}

export default Root;
