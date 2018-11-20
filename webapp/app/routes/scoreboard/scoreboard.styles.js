import styled from 'styled-components';
import LensIcon from '@material-ui/icons/Lens';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { getColor } from '../../utils/rendering';


export const Container = styled(Paper)`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
`;

export const StatusIcon = styled(LensIcon)`
  && {
    color: ${props => props.active ? "limegreen" : "lightgrey"};
    font-size: 12px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
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

export const AvatarContainer = styled.div`
  position: relative;
`;
