import styled from 'styled-components';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';

import { getUnit, getColor } from '../../utils/rendering';


export const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 text-align: center;
 overflow: hidden;
`;

export const ContentContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
`;

export const UserStatus = styled(Typography)`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const ResetButton = styled(Button)`
  && {
    margin-top: ${getUnit(3)}px;
    span {
      color: ${getColor(['grey', 'A700'])};
    }
  }
`;
