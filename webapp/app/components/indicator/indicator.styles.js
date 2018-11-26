import styled, { css } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getColor, getUnit } from '../../utils/rendering';


const whiteStyles = css`
  color: ${getColor(['common', 'white'])} !important;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: ${getUnit()}px;
`;

export const IndicatorBar = styled(CircularProgress)`
  && {
    position: absolute;
    top: -${getUnit(0.75)}px;
    left: -${getUnit(0.75)}px;
    z-index: 2;
    & circle {
      ${({ white }) => white ? whiteStyles : null};
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
      ${({ white }) => white ? whiteStyles : null};
      stroke-width: 1px;
    }
  }
`;

export const ValueWrapper = styled(Button)`
  &&& {
    width: ${getUnit(15)}px;
    height: ${getUnit(15)}px;
    box-shadow: none;
    background-color: transparent;
  }
`;

export const Value = styled(Typography)`
  ${({ white }) => white ? whiteStyles : null};
`;
