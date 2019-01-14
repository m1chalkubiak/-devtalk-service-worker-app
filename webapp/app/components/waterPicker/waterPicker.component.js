import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import SVGInline from 'react-svg-inline';

import { Item, ItemWrapper, Container } from './waterPicker.styles';
import Icon100 from '../../images/svg/100ml.svg';
import Icon250 from '../../images/svg/250ml.svg';
import Icon330 from '../../images/svg/330ml.svg';
import Icon500 from '../../images/svg/500ml.svg';
import Icon1000 from '../../images/svg/1000ml.svg';

const settings = {
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  initialSlide: 1,
  centerMode: true,
  variableWidth: true,
  focusOnSelect: true,
};

const itemList = [
  {
    value: 100,
    icon: <SVGInline svg={Icon100} />,
  },
  {
    value: 250,
    icon: <SVGInline svg={Icon250} />,
  },
  {
    value: 330,
    icon: <SVGInline svg={Icon330} />,
  },
  {
    value: 500,
    icon: <SVGInline svg={Icon500} />,
  },
  {
    value: 1000,
    icon: <SVGInline svg={Icon1000} />,
  },
];

export class WaterPicker extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  handleAfterChange = index => this.props.onChange(itemList[index].value);

  render() {
    return (
      <Container>
        <Slider {...settings} afterChange={this.handleAfterChange}>
          {itemList.map((item, id) => (
            <div key={id}>
              <ItemWrapper>
                <Item
                  icon={item.icon}
                  label={`${item.value}ml`}
                />
              </ItemWrapper>
            </div>
          ))}
        </Slider>
      </Container>
    );
  }
}
