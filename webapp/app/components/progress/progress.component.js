import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ifElse, equals, always } from 'ramda';

import { LinearProgress } from './progress.styles';


export class Progress extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
  };

  render = () => ifElse(
    equals(true),
    () => (
      <Fragment>
        <LinearProgress color="secondary" />
      </Fragment>
    ),
    always(null)
  )(this.props.active);
}
