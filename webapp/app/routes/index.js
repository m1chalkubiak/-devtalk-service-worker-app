import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { AuthRoute } from '../components/authRoute';
import App from './app.container';
import { NotFound } from './notFound';
import Login from './login';
import Dashboard from './dashboard';

export class RootContainer extends Component {
  render() {
    return (
      <Switch>
        <App>
          <Switch>
            <AuthRoute exact path="/" component={Dashboard} />
            <AuthRoute exact path="/dashboard" component={Dashboard} />
            <AuthRoute exact path="/login" component={Login} anonymous />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Switch>
    );
  }
}

export default withRouter(RootContainer);
