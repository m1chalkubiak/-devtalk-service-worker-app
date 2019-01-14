import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/AlarmAdd';
import Divider from '@material-ui/core/Divider';
import { TimePicker } from 'material-ui-pickers';

import { selectLoggedUserAlarms } from '../../modules/users';
import { UserAuthActions } from '../../modules/userAuth';
import messages from './alarmList.messages';
import { AddButton, HideWrapper } from './alarmList.styles';


export class AlarmListComponent extends PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
    userAlarms: PropTypes.instanceOf(Map).isRequired,
    addAlarm: PropTypes.func.isRequired,
    removeAlarm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    show: false,
  };

  pickerRef = createRef();
  time = new Date();

  handleDateChange = time => this.props.addAlarm(time);

  handleDeleteAlarm = id => this.props.removeAlarm(id);

  openPicker = () => this.pickerRef.current.open();

  renderListItem = (item, index) => (
    <ListItem key={index}>
      <ListItemIcon>
        <AlarmIcon />
      </ListItemIcon>
      <ListItemText
        primary={item}
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => this.handleDeleteAlarm(index)}
          aria-label={this.props.intl.formatMessage(messages.removeAlarm)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  render = () => (
    <Collapse in={this.props.show} timeout="auto" unmountOnExit>
      <Divider />
      <List
        subheader={<ListSubheader component="div">
          <FormattedMessage {...messages.alarmListHeader} />
        </ListSubheader>}
        dense
      >
        {this.props.userAlarms.map(this.renderListItem).toArray()}
      </List>
      <AddButton
        onClick={this.openPicker}
        size="medium"
        aria-label={this.props.intl.formatMessage(messages.addAlarm)}
      >
        <AddIcon />
        <FormattedMessage {...messages.addAlarm} />
      </AddButton>
      <HideWrapper>
        <TimePicker
          ampm={false}
          margin="normal"
          label="Time picker"
          value={this.time}
          onChange={this.handleDateChange}
          ref={this.pickerRef}
        />
      </HideWrapper>
    </Collapse>
  );
}


const mapStateToProps = createStructuredSelector({
  userAlarms: selectLoggedUserAlarms,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  addAlarm: UserAuthActions.addAlarm,
  removeAlarm: UserAuthActions.removeAlarm,
}, dispatch);

export const AlarmList = compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(AlarmListComponent);
