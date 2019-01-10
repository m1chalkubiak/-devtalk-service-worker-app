import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { getUnit } from '../../utils/rendering';

export const Form = styled.form`
  width: 100%; // Fix IE 11 issue.
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const AddButton = styled(Button)`
&& {
  margin-top: ${getUnit(3)}px;
  }
`;



