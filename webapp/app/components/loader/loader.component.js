import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ifElse, equals, always } from 'ramda';

import { Container, LoaderProgress } from './loader.styles';


export class Loader extends PureComponent {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
  };

  render = () => ifElse(
    equals(false),
    () => (
      <Container>
        <LoaderProgress mode="indeterminate" />
      </Container>
    ),
    always(null)
  )(this.props.loaded);
}
