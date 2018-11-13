import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

import { getColor } from '../../utils/rendering';

export const LoaderProgress = styled(CircularProgress)`
  && {
   color: ${getColor(['common', 'white'])};
  }
`;

export const Container = styled.div`
   background-color: ${getColor(['primary', 'main'])};
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

