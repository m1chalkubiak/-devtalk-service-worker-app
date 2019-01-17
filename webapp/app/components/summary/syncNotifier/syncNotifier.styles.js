import styled, { css, keyframes } from 'styled-components';
import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';

import { getColor, getUnit } from '../../../utils/rendering';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;


export const Container = styled.div`
  position: relative;
  width: ${getUnit(3)}px;
`;

const iconStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
`;

export const SyncOnIcon = styled(SyncIcon)`
  ${iconStyles};
  animation: ${rotate} 2s linear infinite;
  && {
    color: ${getColor(['common', 'white'])};
  }
`;

export const SyncOffIcon = styled(SyncDisabledIcon)`
  ${iconStyles}
  && {
    color: ${getColor(['common', 'white'])};
    opacity: .5;
  }
`;

