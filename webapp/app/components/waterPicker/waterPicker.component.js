import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import SVGInline from 'react-svg-inline';

import { Item, ItemWrapper, Container } from './waterPicker.styles';
import WaterIcon from './svg/water.svg';

const settings = {
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  initialSlide: 1,
  centerMode: true,
  variableWidth: true,
  focusOnSelect: true,
};

export class WaterPicker extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  handleAfterChange = index => this.props.onChange(this.itemList[index].value);

  itemList = [
    {
      value: 100,
      icon: <SVGInline svg={WaterIcon} />,
    },
    {
      value: 250,
      icon: <LocalCafeIcon />,
    },
    {
      value: 330,
      icon: <LocalCafeIcon />,
    },
    {
      value: 500,
      icon: <LocalCafeIcon />,
    },
    {
      value: 1000,
      icon: <LocalCafeIcon />,
    },
  ];

  render() {
    return (
      <Container>
        <Slider {...settings} afterChange={this.handleAfterChange}>
          {this.itemList.map((item, id) => (
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
