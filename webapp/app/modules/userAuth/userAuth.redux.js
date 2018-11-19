import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';

export const { Types: UserAuthTypes, Creators: UserAuthActions } = createActions({
  setupUser: ['user'],
  setUserData: ['user'],
  setOnlineStatus: ['isOnline'],
  setSyncStatus: ['isSyncing'],
  initializeWaterConsumption: ['value'],
  drinkWater: ['value'],
  clearUserData: null,
  signOut: null,
  signInAnonymously: null,
  listenForFirebaseAuth: null,
}, { prefix: 'USER_AUTH_' });

const UserAuthRecord = new Record({
  uid: null,
  isConfigured: false,
  isOnline: false,
  isSyncing: false,
  waterConsumption: 0,
});

export const INITIAL_STATE = new UserAuthRecord({});

const clearUserData = () => INITIAL_STATE;

const setUserData = (state, { user }) => state.merge(user);

const setOnlineStatus = (state, { isOnline }) => state.merge({ isOnline });

const setSyncStatus = (state, { isSyncing }) => state.merge({ isSyncing });

const drinkWater = (state, { value }) => state.update('waterConsumption', (currentValue) => currentValue + value);

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.SET_USER_DATA]: setUserData,
  [UserAuthTypes.SET_ONLINE_STATUS]: setOnlineStatus,
  [UserAuthTypes.SET_SYNC_STATUS]: setSyncStatus,
  [UserAuthTypes.INITIALIZE_WATER_CONSUMPTION]: drinkWater,
  [UserAuthTypes.DRINK_WATER]: drinkWater,
  [UserAuthTypes.CLEAR_USER_DATA]: clearUserData,
});
