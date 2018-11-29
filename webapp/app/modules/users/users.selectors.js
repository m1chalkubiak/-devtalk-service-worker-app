import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { ifElse, equals } from 'ramda';

import { selectUserUid } from '../userAuth/userAuth.selectors';
import { NAME_SORT_TYPE } from './users.constants';


const sortUsers = (users, type) => users.sortBy(user => user.getIn(['value', type], 0));

export const selectDomain = (state) => state.get('users', Map());

export const selectUsers = createSelector(
  selectDomain,
  (state) => state.get('items', Map()),
);

export const selectSortType = createSelector(
  selectDomain,
  (state) => state.get('sortType', ''),
);

export const selectSortedUsers = createSelector(
  selectUsers,
  selectSortType,
  (users, type) => ifElse(
    equals(NAME_SORT_TYPE),
    () => sortUsers(users, type),
    () => sortUsers(users, type).reverse(),
  )(type),
);

export const selectLoggedUser = createSelector(
  selectUsers, selectUserUid,
  (users, uid) => users.getIn([uid, 'value'], Map()).merge({
    uid,
  }),
);
