import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { getColor } from '../../../../utils/rendering';


export const Container = styled.div`
`;

export const AddButton = styled(Button)`
  && {
    span {
      color: ${getColor(['grey', 'A700'])};
    }
  }
`;

export const HideWrapper = styled.div`
  && {
    display: none;
    
    span[class*='MuiButton-label-'] {
      color: ${getColor(['primary', 'main'])};
    }
  }
`;


