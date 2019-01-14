import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { ProfileForm } from '../../components/';
import messages from './profile.messages';
import { Bar, Header, MoreIcon, Toolbar, Container } from './profile.styles';


export class Profile extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
  };

  get open() {
    return !!this.state.anchorEl;
  }

  handleCloseMenu = () => this.setState({ anchorEl: null });

  handleOpenMenu = ({ currentTarget: anchorEl }) => this.setState({ anchorEl });

  render() {
    const { user, updateUser } = this.props;
    return (
      <Fragment>
        <Helmet title="Profile settings" />
        <Bar position="static">
          <Toolbar disableGutters>
            <Header color="inherit" variant="subtitle1" align="left">
              <FormattedMessage {...messages.profileHeadline} />
            </Header>
            <IconButton
              color="inherit"
              onClick={this.handleOpenMenu}
            >
              <MoreIcon aria-haspopup="true" />
            </IconButton>
          </Toolbar>
          <Menu
            anchorEl={this.state.anchorEl}
            open={this.open}
            onClose={this.handleCloseMenu}
          >
            <MenuItem>
              Reset
            </MenuItem>
          </Menu>
        </Bar>
        <Container>
          <ProfileForm
            initialValues={user}
            onSubmit={updateUser}
          />
        </Container>
      </Fragment>
    );
  }
}
