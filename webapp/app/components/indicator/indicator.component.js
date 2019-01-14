import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Fade from '@material-ui/core/Fade';

import { Container, IndicatorBar, Track, ValueWrapper, Value, ValueSubTitle } from './indicator.styles';
import messages from './indicator.messages';


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
    return Math.min(value, maxValue);
  }

  get percent() {
    return ((this.value / this.props.maxValue) * 100);
  }

  renderValues = () => this.props.maxValue - this.value;

  render = () => (
    <Fade in={this.props.white}>
      <Container>
        <ValueWrapper disabled>
          <Value white={Number(this.props.white)} component="span" variant="subheading">
            {this.renderValues()}
          </Value>
          <ValueSubTitle white={Number(this.props.white)} component="span" variant="caption">
            <FormattedMessage {...messages.waterConsumptionSubtitle} />
          </ValueSubTitle>
        </ValueWrapper>
        <IndicatorBar white={Number(this.props.white)} size={132} variant="static" value={this.percent} />
        <Track white={Number(this.props.white)} size={132} variant="static" value={100} />
      </Container>
    </Fade>
  );
}
