import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getColor } from '../../utils/rendering';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 10px 0;
  overflow: visible;
  
  .slick-list {
    overflow: visible;
  }
  
  .slick-slide {
    opacity: 0.5;
    filter: grayscale(70%);
  }
  
  .slick-center {
    transform: scale(1.3);
    opacity: 1;
    filter: grayscale(0);
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

export const Item = styled(Tab)`
  && {
    opacity: 1;
    padding: 10px 0;
    border-radius: 50%;
    
    &>span {
      text-transform: lowercase;
      color: ${getColor(['primary', 'main'])};
      }
      
    svg {
      fill: ${getColor(['primary', 'main'])};
      width: 1em;
      height: 1em;
    }  
  }
`;



