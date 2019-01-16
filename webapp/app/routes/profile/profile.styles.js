import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MoreVert from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import { getColor, getUnit } from '../../utils/rendering';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: ${getUnit(2)}px;
`;

export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Bar = styled(AppBar)`
  && {
    box-shadow: none;
    background-color: ${getColor(['common', 'white'])};
    padding-top: ${getUnit(0.5)}px;
  }
`;

export const Toolbar = styled(MuiToolbar)`
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled(Typography)`
  padding-left: ${getUnit(2)}px;
`;

export const MoreIcon = styled(MoreVert)`
`;
