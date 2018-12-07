import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Dashboard } from './dashboard.component';
import { selectLoggedUser } from '../../modules/users';
import {
  selectUser, selectOnlineStatus, selectSyncStatus, selectWaterConsumption, UserAuthActions,
} from '../../modules/userAuth';


const mapStateToProps = createStructuredSelector({
  currentUser: selectLoggedUser,
  userData: selectUser,
  isOnline: selectOnlineStatus,
  isSyncing: selectSyncStatus,
  waterConsumption: selectWaterConsumption,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  drinkWater: UserAuthActions.drinkWater,
  resetWaterConsumption: UserAuthActions.resetWaterConsumption,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Dashboard);
