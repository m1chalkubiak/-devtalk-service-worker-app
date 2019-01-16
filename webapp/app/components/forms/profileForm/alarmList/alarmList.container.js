import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { selectLoggedUserAlarms } from '../../../../modules/users';
import { UserAuthActions } from '../../../../modules/userAuth';
import { AlarmListComponent } from './alarmList.component';


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
