import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Container, IndicatorBar, Track, ValueWrapper, Value } from './indicator.styles';


export class Indicator extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number,
    white: PropTypes.bool,
  };

  static defaultProps = {
    maxValue: 100,
    value: 0,
    white: false,
  };

  get value() {
    const { value, maxValue } = this.props;
    return value > maxValue ? maxValue : value;
  }

  get percent() {
    const { maxValue } = this.props;
    return ((this.value / maxValue) * 100);
  }

  get white() {
    return this.props.white ? 1 : 0;
  }

  renderValues = () => `${this.value}/${this.props.maxValue}`;

  render = () => (
    <Container>
      <ValueWrapper variant="fab" disabled>
        <Value white={this.white} component="span" variant="subheading">
          {this.renderValues()}
        </Value>
      </ValueWrapper>
      <IndicatorBar white={this.white} size={132} variant="static" value={this.percent} />
      <Track white={this.white} size={132} variant="static" value={100} />
    </Container>
  );
}
