import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Container, LoaderProgress } from './loader.styles';


export class Loader extends PureComponent {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
  };

  renderLoader = () => {
    if (!this.props.loaded) {
      return (
        <Container>
          <LoaderProgress mode="indeterminate" />
        </Container>
      );
    }
    return null;
  };

  render = () => (
    <Fragment>
      {this.renderLoader()}
    </Fragment>
  );
}
