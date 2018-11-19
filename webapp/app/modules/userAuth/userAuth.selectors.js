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

export const selectOnlineStatus = createSelector(
  selectUser,
  (user) => user.get('isOnline', false),
);

export const selectSyncStatus = createSelector(
  selectUser,
  (user) => user.get('isSyncing', false),
);

export const selectWaterConsumption = createSelector(
  selectUser,
  (user) => user.get('waterConsumption', 0),
);
