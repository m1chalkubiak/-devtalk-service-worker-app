import styled, { css } from 'styled-components';
import WifiIcon from '@material-ui/icons/WifiTethering';
import WifiOffIcon from '@material-ui/icons/PortableWifiOff';

import { getColor, getUnit } from '../../utils/rendering';


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

export const OnlineIcon = styled(WifiIcon)`
  ${iconStyles}
  && {
    color: ${getColor(['common', 'white'])};
  }
`;

export const OfflineIcon = styled(WifiOffIcon)`
  ${iconStyles}
  && {
    color: ${getColor(['common', 'white'])};
    opacity: .5;
  }
`;

