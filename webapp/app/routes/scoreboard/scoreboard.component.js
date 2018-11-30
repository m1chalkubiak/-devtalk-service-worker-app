import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';

import { NAME_SORT_TYPE, WATER_CONSUMPTION_SORT_TYPE } from '../../modules/users';
import { Bar, Toolbar, Header, MoreIcon, Score, DrinkIcon } from './scoreboard.styles';
import messages from './scoreboard.messages';


export class Scoreboard extends PureComponent {
  static propTypes = {
    sortedUsers: PropTypes.instanceOf(Map).isRequired,
    changeSortType: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
  };

  get open() {
    return !!this.state.anchorEl;
  }

  handleCloseMenu = () => this.setState({ anchorEl: null });

  handleOpenMenu = ({ currentTarget: anchorEl }) => this.setState({ anchorEl });

  changeSortType = (sortType = NAME_SORT_TYPE) => {
    this.props.changeSortType(sortType);
    this.handleCloseMenu();
  };

  render = () => (
    <Fragment>
      <Bar position="static">
        <Toolbar disableGutters>
          <Header color="inherit" variant="subheading" align="left">
            <FormattedMessage {...messages.usersListHeadline} />
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
          <MenuItem onClick={() => this.changeSortType(NAME_SORT_TYPE)}>
            <FormattedMessage {...messages.sortByNames} />
          </MenuItem>
          <MenuItem onClick={() => this.changeSortType(WATER_CONSUMPTION_SORT_TYPE)}>
            <FormattedMessage {...messages.sortByWaterConsumptions} />
          </MenuItem>
        </Menu>
      </Bar>
      <List dense>
        {this.props.sortedUsers.map((user, userId) => {
          return (
            <ListItem key={userId}>
              <Avatar
                alt={user.getIn(['value', 'name'], '')}
                src={user.getIn(['value', 'avatarURL'], '')}
              />
              <ListItemText
                primary={user.getIn(['value', 'name'], '')}
              />
              <Score>
                <ListItemText primary={user.getIn(['value', 'waterConsumption'], 0)} />
                <ListItemIcon>
                  <DrinkIcon />
                </ListItemIcon>
              </Score>
            </ListItem>
          );
        }).toArray()}
      </List>
    </Fragment>
  );
}
