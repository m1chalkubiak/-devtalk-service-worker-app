import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { getColor, getUnit } from '../../utils/rendering';


export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: ${getUnit()}px;
  position: relative;
`;

export const IndicatorBar = styled(CircularProgress)`
  && {
    position: absolute;
    top: -${getUnit(0.75)}px;
    left: -${getUnit(0.75)}px;
    z-index: 2;
    & circle {
      stroke-width: 1px;
    }
  }
`;

export const Track = styled(CircularProgress)`
  && {
    position: absolute;
    top: -${getUnit(0.75)}px;
    left: -${getUnit(0.75)}px;
    z-index: 1;
    opacity: 0.2;
    & circle {
      stroke-width: 1px;
    }
  }
`;

export const Value = styled(Button)`
  &&& {
    width: ${getUnit(15)}px;
    height: ${getUnit(15)}px;
    box-shadow: none;
    background-color: transparent;
    & > span {
      color: ${getColor(['common', 'black'])};
    }
  }
`;



