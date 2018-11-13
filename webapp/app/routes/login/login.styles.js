import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';


export const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginForm = styled.form`
  width: 50%;
  min-width: 320px;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginIcon = styled(SendIcon)`

`;

export const LoginButton = styled(Button)`

`;

