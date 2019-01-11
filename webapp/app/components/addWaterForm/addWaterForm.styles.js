import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { getColor, getUnit } from '../../utils/rendering';

export const Form = styled.form`
  width: 100%; // Fix IE 11 issue.
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const AddButton = styled(Button)`
&& {
  width: auto;
  margin-top: ${getUnit(3)}px;
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


