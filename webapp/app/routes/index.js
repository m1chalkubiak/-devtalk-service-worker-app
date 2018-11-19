import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { AuthRoute } from '../components/authRoute';
import App from './app.container';
import { NotFound } from './notFound';
import Login from './login';
import Dashboard from './dashboard';
import Scoreboard from './scoreboard';
import { Navigation } from "../components";

export class RootContainer extends Component {
  render() {
    return (
      <Switch>
        <App>

          <Switch>
            <Route exact path="/login" component={Login} anonymous />

            <Navigation>
              <Switch>
                <AuthRoute exact path="/" component={Dashboard} />
                <AuthRoute exact path="/dashboard" component={Dashboard} />
                <AuthRoute exact path="/scoreboard" component={Scoreboard} />
              </Switch>
            </Navigation>
          </Switch>
        </App>
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default withRouter(RootContainer);
