import { pick } from 'ramda';
import { select, all, fork, put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';
import { reset } from 'redux-form';
import { replace } from 'react-router-redux';

import { dbRef } from '../utils/refs';
import { getUserAvatarURL } from '../../utils/rendering';
import { createSaga } from '../utils/entityRegistry';
import { UsersTypes, UsersActions } from './users.redux';
import { selectDomain as selectUsers, selectLoggedUser } from './users.selectors';
import { SET_NAME_FORM } from './users.constants';
import { UserAuthActions } from '../userAuth';


const registrySaga = createSaga({
  actions: UsersActions,
  types: UsersTypes,
  baseDbRef: dbRef,
  registrySelector: selectUsers,
});

function* setupUserData({ user: { name } }) {
  if (name) {
    yield put(UserAuthActions.setUserData({
      isConfigured: true,
    }));
  }
  const loggedUser = yield select(selectLoggedUser);
  const uid = loggedUser.get('uid', '');
  const avatarURL = getUserAvatarURL({ uid });
  yield put(UsersActions.createUser({ uid, name, avatarURL }));
}

export function* createUser({ user: { uid, ...user } }) {
  try {
    const usersRef = dbRef.child('users');
    yield usersRef.child(uid).update(pick(['name', 'avatarURL'])(user));
    yield put(reset(SET_NAME_FORM));
    yield put(replace('/'));
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
      takeLatest(UsersTypes.CREATE_USER, createUser),
      takeLatest(UsersTypes.SETUP_USER_DATA, setupUserData),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
