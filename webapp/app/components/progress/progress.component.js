import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import { renderWhenTrue } from '../../utils/rendering';
import { LinearProgress } from './progress.styles';


export class Progress extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
  };

  render = () => renderWhenTrue(
    () => (
      <Fragment>
        <LinearProgress color="secondary" />
      </Fragment>
    ),
  )(this.props.active);
}
