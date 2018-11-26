import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';

import { Container, SyncOnIcon, SyncOffIcon } from './syncNotifier.styles';


export class SyncNotifier extends PureComponent {
  static propTypes = {
    syncOn: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    syncOn: false,
  };

  render = () => (
    <Container>
      <Fade in={this.props.syncOn}>
        <SyncOnIcon color="secondary" />
      </Fade>
      <Fade in={!this.props.syncOn}>
        <div>
          <SyncOffIcon color="inherit" />
        </div>
      </Fade>
    </Container>
  );
}
