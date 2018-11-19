import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { equals, ifElse } from 'ramda';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Container, StatusIcon } from './scoreboard.styles';


export class Scoreboard extends PureComponent {
  static propTypes = {
    users: PropTypes.instanceOf(Map).isRequired,
  };

  componentDidMount() {
    console.log(this.props.users.toJS());
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
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>Status</TableCell>
            <TableCell numeric>Total water consumption</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.users.map((user, userId) => {
            return (
              <TableRow key={userId}>
                <TableCell component="th" scope="row">
                  {user.getIn(['value', 'name'])}
                </TableCell>
                <TableCell numeric>{this.renderUserStatus(user.getIn(['value', 'isOnline'], false))}</TableCell>
                <TableCell numeric>{user.getIn(['value', 'waterConsumption'], '0')}</TableCell>
              </TableRow>
            );
          }).toArray()}
        </TableBody>
      </Table>
    </Container>
  );
}
