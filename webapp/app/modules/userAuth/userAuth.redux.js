import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';

export const { Types: UserAuthTypes, Creators: UserAuthActions } = createActions({
  setupUser: ['user'],
  setUserData: ['user'],
  clearUserData: null,
  signOut: null,
  signInAnonymously: null,
  listenForFirebaseAuth: null,
}, { prefix: 'USER_AUTH_' });

const UserAuthRecord = new Record({
  uid: null,
  isConfigured: false,
});

export const INITIAL_STATE = new UserAuthRecord({});

const clearUserData = () => INITIAL_STATE;

const setUserData = (state, { user }) => state.merge(user);

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.SET_USER_DATA]: setUserData,
  [UserAuthTypes.CLEAR_USER_DATA]: clearUserData,
});
