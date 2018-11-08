import { pick } from 'ramda';
import { select, all, fork, put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';
import { reset } from 'redux-form';

import { dbRef } from '../utils/refs';
import { getUserAvatarURL } from '../../utils/rendering';
import { createSaga } from '../utils/entityRegistry';
import { UsersTypes, UsersActions, ONLINE_STATUS } from './users.redux';
import { selectDomain as selectUsers, selectLoggedUser } from './users.selectors';
import { SET_NAME_FORM } from './users.constants';
import { UserAuthTypes, UserAuthActions } from '../userAuth';


const registrySaga = createSaga({
  actions: UsersActions,
  types: UsersTypes,
  baseDbRef: dbRef,
  registrySelector: selectUsers,
});

export function* changeUserStatus({ uid, status }) {
  try {
    const usersRef = dbRef.child('users');

    yield usersRef.child(uid).child('status').set(status);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* setupUserData({ user: { name } }) {
  if (name) {
    yield put(UserAuthActions.setUserData({
      isConfigured: true,
    }));
  }
  const loggedUser = yield select(selectLoggedUser);
  const uid = loggedUser.get('uid', '');
  const avatarURL = getUserAvatarURL({ uid });
  yield put(UsersActions.checkIfUserAccountExists({ uid, name, avatarURL }));
}

function* checkIfUserAccountExists({ user }) {
  try {
    const loggedUser = yield select(selectLoggedUser);
    if (loggedUser.size > 1) {
      yield put(UsersActions.changeUserStatus(loggedUser.get('uid'), ONLINE_STATUS));
    }

    yield put(UsersActions.createUser(user));
  } catch (error) {
    reportError(error);
  }
}

export function* createUser({ user: { uid, ...user } }) {
  try {
    const usersRef = dbRef.child('users');
    yield usersRef.child(uid).update(pick(['name', 'avatarURL'])(user));
    yield put(reset(SET_NAME_FORM));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export function* startListeningForState() {
  try {
    yield put(UsersActions.startListening('/users', 'items'));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export default function* watchUsers() {
  try {
    yield all([
      fork(registrySaga),
      takeLatest(UsersTypes.LISTEN_FOR_USERS, startListeningForState),
      takeLatest(UsersTypes.CHANGE_USER_STATUS, changeUserStatus),
      takeLatest(UsersTypes.CHECK_IF_USER_ACCOUNT_EXISTS, checkIfUserAccountExists),
      takeLatest(UsersTypes.CREATE_USER, createUser),
      takeLatest(UsersTypes.SETUP_USER_DATA, setupUserData),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
