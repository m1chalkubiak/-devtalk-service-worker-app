import { createActions } from 'reduxsauce';

export const { Types: SyncTypes, Creators: SyncActions } = createActions({
  syncWaterConsumption: ['value'],
}, { prefix: 'SYNC_' });
