import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';


export class AuthRoute extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    anonymous: PropTypes.bool.isRequired,
    defaultRedirect: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
  };

  static defaultProps = {
    anonymous: false,
    defaultRedirect: '/login',
  };

  renderRoute = () => <Route {...this.props} />;

  render() {
    const { isAuthenticated, anonymous, defaultRedirect } = this.props;

    if (isAuthenticated) {
      /**
       * This route is only viewable by unauthenticated users
       */
      if (anonymous) {
        return <Redirect to="/" />;
      }

      /**
       * User has met all criteria and the route can be rendered
       */
      return this.renderRoute();
    }

    /**
     * This route is viewable by anonymous users
     */
    if (anonymous) {
      return this.renderRoute();
    }

    /**
     * Redirect to register by default
     */
    return <Redirect to={defaultRedirect} />;
  }
}
