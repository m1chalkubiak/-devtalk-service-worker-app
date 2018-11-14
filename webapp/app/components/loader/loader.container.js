import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { hot } from 'react-hot-loader';

import { selectIsDataLoaded } from '../../modules/loader';
import { Loader } from './loader.component';


const mapStateToProps = createStructuredSelector({
  loaded: selectIsDataLoaded,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps)
)(Loader);
