import styled from 'styled-components';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { getColor } from '../../utils/rendering';


export const Container = styled(Paper)`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
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
