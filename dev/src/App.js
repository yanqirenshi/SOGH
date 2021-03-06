import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import 'react-bulma-components/dist/react-bulma-components.min.css';

import PageHome from './PageHome.js';
import PageProductBacklog from './PageProductBacklog.js';

function App() {
    return (
        <Router>
          <Switch>
            <Route exact path='/' component={PageHome} />
            <Route exact path='/product-backlogs/:id' component={PageProductBacklog} />
          </Switch>
        </Router>
    );
}

export default App;
