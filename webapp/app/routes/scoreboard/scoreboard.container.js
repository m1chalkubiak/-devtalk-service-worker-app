import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { compose } from 'ramda';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Scoreboard } from './scoreboard.component';
import { selectUsers, UsersActions } from '../../modules/users/';


const mapStateToProps = createStructuredSelector({
  users: selectUsers,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setupUserData: UsersActions.setupUserData,
}, dispatch);

export default hot(module)(compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Scoreboard));

