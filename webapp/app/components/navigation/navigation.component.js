import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Container, NavigationItem, HomeIcon, ScoreboardIcon, SettingsIcon } from './navigation.styles';


export class Navigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render = () => (
    <Fragment>
      {React.Children.only(this.props.children)}
      <Container
        value={this.state.value}
        onChange={this.handleChange}
        showLabels
      >
        <NavigationItem
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to={'/dashboard'}
        />
        <NavigationItem
          label="Scoreboard"
          icon={<ScoreboardIcon />}
          component={Link}
          to={'/scoreboard'}
        />
        <NavigationItem
          label="Settings"
          icon={<SettingsIcon />}
          component={Link}
          to={'#'}
        />
      </Container>
    </Fragment>
  );
}
