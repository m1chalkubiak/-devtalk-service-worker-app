import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container, NavigationItem, HomeIcon, ScoreboardIcon, SettingsIcon } from './navigation.styles';


export class Navigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  };

  render = () => {
    const { children, location: { pathname } } = this.props;

    return (
      <Fragment>
        {React.Children.only(children)}
        <Container
          value={pathname}
          showLabels
        >
          <NavigationItem
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to={'/'}
            value={'/'}
          />
          <NavigationItem
            label="Scoreboard"
            icon={<ScoreboardIcon />}
            component={Link}
            to={'/scoreboard'}
            value={'/scoreboard'}
          />
          <NavigationItem
            label="Settings"
            icon={<SettingsIcon />}
            component={Link}
            to={'#'}
          />
        </Container>
      </Fragment >
    );
  };
}
