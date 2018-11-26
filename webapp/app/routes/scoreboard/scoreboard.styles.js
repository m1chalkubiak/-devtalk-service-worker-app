import styled from 'styled-components';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MoreVert from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import { getColor, getUnit } from '../../utils/rendering';


export const Bar = styled(AppBar)`
  && {
    box-shadow: none;
    background-color: ${getColor(['common', 'white'])}
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

export const Score = styled(ListItemSecondaryAction)`
  && {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
`;

export const DrinkIcon = styled(LocalDrinkIcon)`
  && {
    color: ${getColor(['secondary', 'dark'])};
  }
`;
