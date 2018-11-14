import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { compose } from 'ramda';
import { reduxForm } from 'redux-form/immutable';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Login } from './login.component';
import { UsersActions, SET_NAME_FORM } from '../../modules/users/';


const mapStateToProps = createStructuredSelector({
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setupUserData: UsersActions.setupUserData,
}, dispatch);

export default hot(module)(compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: SET_NAME_FORM,
  })
)(Login));

