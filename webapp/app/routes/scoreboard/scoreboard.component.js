import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { equals, ifElse } from 'ramda';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

import { StatusIcon, Score, DrinkIcon, AvatarContainer } from './scoreboard.styles';


export class Scoreboard extends PureComponent {
  static propTypes = {
    users: PropTypes.instanceOf(Map).isRequired,
  };

  renderUserStatus = (status) => ifElse(
    equals(true),
    () => (
      <StatusIcon active="true" />
    ),
    () => (
      <StatusIcon />
    )
  )(status);

  render = () => (
    <Fragment>
      <List dense subheader={<ListSubheader>Users</ListSubheader>}>
        {this.props.users.map((user, userId) => {
          return (
            <ListItem key={userId}>
              <AvatarContainer>
                {this.renderUserStatus(user.getIn(['value', 'isOnline'], false))}
                <Avatar alt={user.getIn(['value', 'name'])} src={user.getIn(['value', 'avatarURL'])} />
              </AvatarContainer>
              <ListItemText primary={user.getIn(['value', 'name'])} />
              <Score>
                <ListItemText primary={user.getIn(['value', 'waterConsumption'], '0')} />
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
