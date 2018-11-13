import { Map, Record } from 'immutable';
import { createActions, createReducer } from '../utils/entityRegistry';
import { UserAuthTypes } from '../userAuth/userAuth.redux';


export const {
  Types: UsersTypes,
  Creators: UsersActions,
} = createActions({
  setupUserData: ['user'],
  createUser: ['user'],
  listenForUsers: null,
  checkIfUserAccountExists: ['user'],
}, { prefix: 'USERS_' });

const UserAuthRecord = new Record({
  items: Map(),
}, 'users');

const INITIAL_STATE = new UserAuthRecord();

const signOut = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [UserAuthTypes.SIGN_OUT]: signOut,
}, { types: UsersTypes });