import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Dashboard } from './dashboard.component';
import { selectUsers, selectLoggedUser } from '../../modules/users';
import { selectOnlineStatus, selectSyncStatus, selectWaterConsumption, UserAuthActions } from '../../modules/userAuth';


const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  currentUser: selectLoggedUser,
  isOnline: selectOnlineStatus,
  isSyncing: selectSyncStatus,
  waterConsumption: selectWaterConsumption,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  drinkWater: UserAuthActions.drinkWater,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Dashboard);
