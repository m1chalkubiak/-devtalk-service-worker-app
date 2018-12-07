import { path, concat, ifElse, always, propEq } from 'ramda';
import { css } from 'styled-components';


export const getUserAvatarURL = ({ uid, size = 285 }) => `https://api.adorable.io/avatars/${size}/${uid}.png`;

export const getUnit = (multiplier = 1) => props => path(['theme', 'spacing', 'unit'])(props) * multiplier;

export const getColor = (color) => path(concat(['theme', 'palette'], color));

export const whiteStyles = css`
  color: ${getColor(['common', 'white'])} !important;
`;

export const whenProp = prop => styles => ifElse(propEq(prop, 1), always(styles), always(null));

export const whenWhite = whenProp('white');

export const white = whenWhite(whiteStyles);
