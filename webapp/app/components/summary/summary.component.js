import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { Indicator } from '../';
import { Container } from './summary.styles';


export class Summary extends PureComponent {
  static propTypes = {
    userData: PropTypes.instanceOf(Map).isRequired,
  };

  static defaultProps = {
    maxValue: 100,
  };

  render = () => (
    <Container>
      <Indicator maxValue={500} value={150} />
    </Container>
  );
}
