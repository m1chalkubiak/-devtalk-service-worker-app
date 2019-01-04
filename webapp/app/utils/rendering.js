import { path, concat, ifElse, always, equals, propEq, complement, isNil } from 'ramda';
import { css } from 'styled-components';

export const renderWhen = (pred, fn) => ifElse(pred, fn, always(null));

export const renderWhenNotNil = (fn) => renderWhen(complement(isNil), fn);

export const renderWhenTrue = (fn) => renderWhen(equals(true), fn);

export const getUserAvatarURL = ({ uid, size = 285 }) => `https://api.adorable.io/avatars/${size}/${uid}.png`;

export const getUnit = (multiplier = 1) => props => path(['theme', 'spacing', 'unit'])(props) * multiplier;

export const getColor = (color) => path(concat(['theme', 'palette'], color));

export const whiteStyles = css`
  color: ${getColor(['common', 'white'])} !important;
`;

export const whenProp = prop => styles => ifElse(propEq(prop, 1), always(styles), always(null));

export const whenWhite = whenProp('white');

export const white = whenWhite(whiteStyles);
