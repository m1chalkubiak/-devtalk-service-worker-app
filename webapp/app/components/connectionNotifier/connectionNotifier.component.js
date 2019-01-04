import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';

import { Container, OnlineIcon, OfflineIcon } from './connectionNotifier.styles';


export class ConnectionNotifier extends PureComponent {
  static propTypes = {
    online: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    online: false,
  };

  render = () => (
    <Container>
      <Fade in={this.props.online}>
        <OnlineIcon color="secondary" />
      </Fade>
      <Fade in={!this.props.online}>
        <div>
          <OfflineIcon color="inherit" />
        </div>
      </Fade>
    </Container>
  );
}
