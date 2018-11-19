import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import { getColor, getUnit } from '../../utils/rendering';


export const Container = styled(Paper)`
  background-color: ${getColor(['primary', 'main'])};
`;
