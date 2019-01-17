import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthRoute } from '../components/authRoute';
import App from './app.container';
import { NotFound } from './notFound';
import Login from './login';
import Dashboard from './dashboard';
import Scoreboard from './scoreboard';
import Profile from './profile';
import { Navigation } from '../components';

export class RootContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Switch>
        <App>
          <Switch>
            <Route exact path="/login" component={Login} anonymous />
            <Navigation location={this.props.location}>
              <Switch>
                <AuthRoute exact path="/" component={Dashboard} />
                <AuthRoute exact path="/scoreboard" component={Scoreboard} />
                <AuthRoute exact path="/profile" component={Profile} />
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
