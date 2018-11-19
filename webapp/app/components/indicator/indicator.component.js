import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { Container, IndicatorBar, Track, Value } from './indicator.styles';


export class Indicator extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number,
  };

  static defaultProps = {
    maxValue: 100,
  };

  get value() {
    const { value, maxValue } = this.props;
    return value > maxValue ? maxValue : value;
  }

  renderValues = () => `${this.value}/${this.props.maxValue}`;

  render = () => (
    <Container>
      <Value variant="fab" disabled>
        <Typography component="span" variant="subheading">
          {this.renderValues()}
        </Typography>
      </Value>
      <IndicatorBar size={132} variant="static" value={25} />
      <Track size={132} variant="static" value={100} />
    </Container>
  );
}
