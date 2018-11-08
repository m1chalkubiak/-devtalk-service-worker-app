import { createSelector } from 'reselect';

export const selectUser = state => state.get('userAuth');

export const selectUserUid = createSelector(
  selectUser,
  (state) => state.get('uid', ''),
);

export const selectIsConfigured = createSelector(
  selectUser,
  (state) => state.get('isConfigured')
);
