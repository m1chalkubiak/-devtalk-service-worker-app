import styled, { css } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

import { getUnit, white } from '../../utils/rendering';


export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: ${getUnit()}px;
`;

export const circularProgressStyles = css`
    position: absolute;
    top: -${getUnit(0.75)}px;
    left: -${getUnit(0.75)}px;
    & circle {
      ${white};
      stroke-width: 1px;
    }
`;

export const IndicatorBar = styled(CircularProgress)`
  && {
    ${circularProgressStyles};
    z-index: 2;
  }
`;

export const Track = styled(CircularProgress)`
  && {
    ${circularProgressStyles};
    z-index: 1;
    opacity: 0.2;
  }
`;

export const ValueWrapper = styled(Fab)`
  &&& {
    width: ${getUnit(15)}px;
    height: ${getUnit(15)}px;
    box-shadow: none;
    background-color: transparent;
    span {
      flex-direction: column;
    }
  }
`;

export const Value = styled(Typography)`
  ${white}
`;

export const ValueSubTitle = styled(Typography)`
  ${white}
`;
