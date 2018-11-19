import styled from 'styled-components';
import LensIcon from '@material-ui/icons/Lens';
import Paper from '@material-ui/core/Paper';

export const Container = styled(Paper)`
  width: 100%; 
  margin 20px;
  
  @media (min-width: 700px) {
  width: 100%;  
  }
`;

export const StatusIcon = styled(LensIcon)`
  && {
    color: ${props => props.active ? "green" : "lightgrey"};
    font-size: 8px;
  }
`;


