import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

import { Score, DrinkIcon } from './scoreboard.styles';

const NAME_SORT_TYPE = 'name';
const WATER_CONSUMPTION_SORT_TYPE = 'waterConsumption';

export class Scoreboard extends PureComponent {
  static propTypes = {
    users: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    sortBy: NAME_SORT_TYPE,
  };

  handleWaterConsumptionClick = () => this.setState({
    sortBy: WATER_CONSUMPTION_SORT_TYPE,
  });

  handleNameClick = () => this.setState({
    sortBy: NAME_SORT_TYPE,
  });

  sortByStatus = (users) => users.sortBy(user => user.getIn(['value', this.state.sortBy], 0)).reverse();

    render = () => (
      <Fragment>
        <List dense subheader={<ListSubheader>Users</ListSubheader>}>
          {this.sortByStatus(this.props.users).map((user, userId) => {
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
