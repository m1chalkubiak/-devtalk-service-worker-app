import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { compose } from 'ramda';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Scoreboard } from './scoreboard.component';
import { selectSortedUsers, UsersActions } from '../../modules/users/';


const mapStateToProps = createStructuredSelector({
  sortedUsers: selectSortedUsers,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeSortType: UsersActions.changeSortType,
}, dispatch);

export default hot(module)(compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Scoreboard));

