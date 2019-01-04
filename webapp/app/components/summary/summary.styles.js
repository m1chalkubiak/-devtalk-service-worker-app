import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MuiToolbar from '@material-ui/core/Toolbar';
import MoreVert from '@material-ui/icons/MoreVert';

import { getColor, getUnit } from '../../utils/rendering';


export const Container = styled(Paper)`
  && {
    box-shadow: none;
    position: relative;
    width: 100%;
    background-color: ${getColor(['primary', 'main'])};
    padding-top: ${getUnit(0.5)}px;
  }

  &:after {
    content: '';
    background-color: ${getColor(['primary', 'main'])};
    position: absolute;
    left: -25%;
    bottom: -15%;
    z-index: -1;
    width: 150%;
    height: 115%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }
`;

export const Bar = styled(AppBar)`
  && {
    box-shadow: none;
  }
`;

export const Toolbar = styled(MuiToolbar)`
  align-items: center;
  justify-content: space-between;
`;

export const MoreIcon = styled(MoreVert)`
  color: ${getColor(['common', 'white'])};
`;

export const Header = styled(Typography)`
  padding-left: ${getUnit(2)}px;
  && {
    color: ${getColor(['common', 'white'])};
  }
`;

export const DataContainer = styled.aside`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
`;
