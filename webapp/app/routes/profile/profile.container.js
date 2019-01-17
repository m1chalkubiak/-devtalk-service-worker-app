import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Profile } from './profile.component';
import { selectLoggedUser } from '../../modules/users';
import { UserAuthActions } from '../../modules/userAuth';


const mapStateToProps = createStructuredSelector({
  user: selectLoggedUser,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateUser: UserAuthActions.updateUserData,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Profile);
