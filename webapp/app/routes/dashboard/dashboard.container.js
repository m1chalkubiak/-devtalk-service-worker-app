import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Dashboard } from './dashboard.component';
import { selectUsers, selectLoggedUser } from '../../modules/users';


const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  currentUser: selectLoggedUser,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Dashboard);
