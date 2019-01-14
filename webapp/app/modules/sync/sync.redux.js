import { createActions } from 'reduxsauce';

export const { Types: SyncTypes, Creators: SyncActions } = createActions({
  syncWaterConsumption: ['value'],
  syncResetWaterConsumption: null,
  syncUserData: ['user'],
  syncAddAlarm: ['data'],
  syncRemoveAlarm: ['id'],
}, { prefix: 'SYNC_' });
