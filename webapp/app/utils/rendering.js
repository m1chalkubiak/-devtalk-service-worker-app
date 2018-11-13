import { path, split, concat } from 'ramda';


export const getUserAvatarURL = ({ uid, size = 285 }) => `https://api.adorable.io/avatars/${size}/${uid}.png`;

export const getProp = (propPath) => props => path(split('.', propPath))(props);

export const getUnit = (multiplier = 1) => props => path(['theme', 'spacing', 'unit'])(props) * multiplier;

export const getColor = (color) => path(concat(['theme', 'palette'], color));
