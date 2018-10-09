import styled from 'styled-components';

import { SpriteImage } from '../../theme';

export const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 text-align: center;
`;

export const Title = styled.h1`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

export const TitleLogo = SpriteImage.extend`
  margin-bottom: 16px;
`;
