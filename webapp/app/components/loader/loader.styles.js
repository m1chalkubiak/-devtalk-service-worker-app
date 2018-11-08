import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';


export const LoaderProgress = styled(CircularProgress)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  z-index: 20;
`;

