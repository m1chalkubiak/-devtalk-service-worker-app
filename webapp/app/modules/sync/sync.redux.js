import { createActions } from 'reduxsauce';

export const { Types: SyncTypes, Creators: SyncActions } = createActions({
  syncWaterConsumption: ['value'],
  syncResetWaterConsumption: null,
}, { prefix: 'SYNC_' });
