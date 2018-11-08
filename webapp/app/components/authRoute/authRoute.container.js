import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { hot } from 'react-hot-loader';

import { selectIsConfigured } from '../../modules/userAuth';
import { AuthRoute } from './authRoute.component';


const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsConfigured,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthRoute);
