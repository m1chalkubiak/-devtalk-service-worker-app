import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import { getUnit } from '../../../utils/rendering';


export const InputField = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;

export const SwitchWrapper = styled(FormControlLabel)`
  && {
    margin: 0 ${getUnit(4)}px;
  }

  span[class*='MuiFormControlLabel'] {
    width: 100%;
    text-align: left;
    padding-left: ${getUnit(2)}px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 300px;
  max-width: 300px;
  > * {
    width: 100%;
  }
`;

export const Submit = styled(Button)`
  && {
    margin-top: ${getUnit(3)}px;
  }
`;
