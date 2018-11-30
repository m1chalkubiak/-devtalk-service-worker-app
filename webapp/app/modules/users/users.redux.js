import { Map, Record } from 'immutable';

import { createActions, createReducer } from '../utils/entityRegistry';
import { NAME_SORT_TYPE } from './users.constants';


export const {
  Types: UsersTypes,
  Creators: UsersActions,
} = createActions({
  setupUserData: ['user'],
  createUser: ['user'],
  listenForUsers: null,
  checkIfUserAccountExists: ['user'],
  changeSortType: ['sortType'],
  resetUsersList: null,
}, { prefix: 'USERS_' });

const UserAuthRecord = new Record({
  items: Map(),
  sortType: NAME_SORT_TYPE,
}, 'users');

const INITIAL_STATE = new UserAuthRecord();

const resetUsersList = () => INITIAL_STATE;

const changeSortType = (state, { sortType }) => state.set('sortType', sortType);

export const reducer = createReducer(INITIAL_STATE, {
  [UsersTypes.CHANGE_SORT_TYPE]: changeSortType,
  [UsersTypes.RESET_USERS_LIST]: resetUsersList,
}, { types: UsersTypes });
