import styled from 'styled-components';
import Button from '@material-ui/core/Button/Button';

import { getUnit } from '../../utils/rendering';


export const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 text-align: center;
 overflow: hidden;
`;

export const Header = styled.h1`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

export const AddButton = styled(Button)`
  && {
    margin-top: ${getUnit(3)}px;
  }
`;
