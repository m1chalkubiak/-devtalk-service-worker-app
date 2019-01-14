import reportError from 'report-error';
import {
  path, concat, ifElse, always, equals, propEq, complement, isNil, when, is, pipe, cond, gte, T,
} from 'ramda';
import { List } from 'immutable';
import { css } from 'styled-components';


export const getUserAvatarURL = ({ uid, size = 285 }) => `https://api.adorable.io/avatars/${size}/${uid}.png`;

export const getDailyWaterRequirements = ({ age = 25, weight = 75 }) => pipe(
  () => cond([
    [gte(6), always(90)],
    [gte(10), always(70)],
    [gte(18), always(40)],
    [T, always(30)],
  ])(age),
  (ml) => weight * ml,
)(age);

export const renderWhen = (pred, fn) => ifElse(pred, fn, always(null));

export const renderWhenNotNil = (fn) => renderWhen(complement(isNil), fn);

export const renderWhenTrue = (fn) => renderWhen(equals(true), fn);

export const getFormFieldHelperText = (intl, messages, { error, invalid, touched }) => {
  if (invalid && touched) {
    try {
      return intl.formatMessage(messages[pipe(
        when(
          is(List),
          (errors) => errors.first()
        ),
        when(
          is(Array),
          ([firstError]) => firstError
        ),
      )(error)]);
    } catch (e) {
      reportError(e);
    }
  }
  return '';
};


export const getUnit = (multiplier = 1) => props => path(['theme', 'spacing', 'unit'])(props) * multiplier;

export const getColor = (color) => path(concat(['theme', 'palette'], color));

export const whiteStyles = css`
  color: ${getColor(['common', 'white'])} !important;
`;

export const whenProp = prop => styles => ifElse(propEq(prop, 1), always(styles), always(null));

export const whenWhite = whenProp('white');

export const white = whenWhite(whiteStyles);
