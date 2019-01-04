import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { renderWhenTrue } from '../../utils/rendering';
import { Container, LoaderProgress } from './loader.styles';


export class Loader extends PureComponent {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
  };

  render = () => renderWhenTrue(
    () => (
      <Container>
        <LoaderProgress mode="indeterminate" />
      </Container>
    ),
  )(!this.props.loaded);
}
