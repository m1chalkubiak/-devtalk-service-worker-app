import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

import { NAME_SORT_TYPE, WATER_CONSUMPTION_SORT_TYPE } from '../../modules/users';
import { Score, DrinkIcon } from './scoreboard.styles';


export class Scoreboard extends PureComponent {
  static propTypes = {
    sortedUsers: PropTypes.instanceOf(Map).isRequired,
    changeSortType: PropTypes.func.isRequired,
    sortType: PropTypes.string.isRequired,
  };

  handleWaterConsumptionClick = () => this.props.changeSortType(WATER_CONSUMPTION_SORT_TYPE);

  handleNameClick = () => this.props.changeSortType(NAME_SORT_TYPE);

  changeSortType = (sortType = NAME_SORT_TYPE) => this.props.changeSortType(sortType);

  render = () => (
    <Fragment>

      <List key={this.props.sortType} dense subheader={<ListSubheader>Users</ListSubheader>}>
        {this.props.sortedUsers.map((user, userId) => {
          return (
            <ListItem key={userId}>
              <Avatar
                onClick={this.handleWaterConsumptionClick}
                alt={user.getIn(['value', 'name'], '')}
                src={user.getIn(['value', 'avatarURL'], '')}
              />
              <ListItemText
                onClick={this.handleNameClick}
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
