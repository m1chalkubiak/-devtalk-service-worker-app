import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { hot } from 'react-hot-loader';

import { Navigation } from './navigation.component';


const mapStateToProps = createStructuredSelector({
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps)
)(Navigation);
