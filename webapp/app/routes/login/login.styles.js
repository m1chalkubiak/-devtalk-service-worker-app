import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { getUnit } from '../../utils/rendering';


export const Wrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getUnit(2)}px ${getUnit(3)}px ${getUnit(3)}px;
  max-width: ${getUnit(50)}px;
  margin-left: auto;
  margin-right: auto;
`;

export const LoginForm = styled.form`
  width: 100%; // Fix IE 11 issue.
  display: flex;
  flex-direction: column;
`;

export const LoginButton = styled(Button)`
  margin-top: ${getUnit(3)}px;
`;
