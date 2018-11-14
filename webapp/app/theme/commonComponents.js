import styled from 'styled-components';
import TextFieldMUI from '@material-ui/core/TextField';

import { getUnit } from '../utils/rendering';

export const TextField = styled(TextFieldMUI)`
  && {
    margin-bottom: ${getUnit(3)}px;
  }
`;

export const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 2px 0 0 rgba(30, 34, 59, 0.2);
`;
