import { takeLatest, put, select, all, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { replace } from 'react-router-redux';
import reportError from 'report-error';
import firebase from 'firebase';

import { StartupTypes } from '../startup';
import { UsersActions } from '../users/users.redux';
import { selectLocationState } from '../router/router.selectors';
import { SyncActions } from '../sync/sync.redux';
import { UserAuthTypes, UserAuthActions } from './userAuth.redux';
import { selectIsConfigured } from './userAuth.selectors';
import { LoaderActions } from '../loader/';

function* signInAnonymously() {
  try {
    yield firebase.auth().signInAnonymously();
  } catch (error) {
    reportError(error);
  }
}

function* signOutFromFirebase() {
  try {
    yield put(UserAuthActions.clearUserData());
    yield firebase.auth().signOut();
    yield put(UserAuthActions.signInAnonymously());
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

const listenForAuth = () => eventChannel((emitter) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    setTimeout(() => {
      if (user) {
        emitter({ user, authenticated: true });
      } else {
        emitter({ authenticated: false });
      }
    });
  });

  return () => unsubscribe();
});

function* listenForFirebaseAuth() {
  try {
    const listenForAuthChan = yield listenForAuth();

    while (true) { // eslint-disable-line
      const { authenticated, user } = yield take(listenForAuthChan);
      if (!authenticated) {
        yield put(UserAuthActions.signInAnonymously());
      } else {
        yield put(UserAuthActions.setUserData({ uid: user.uid }));
        yield put(UsersActions.listenForUsers());
        yield put(UserAuthActions.setOnlineStatus(true));

        const data = yield firebase.database().ref(`/users/${user.uid}`).once('value');
        yield put(LoaderActions.setDataLoaded());
        if (data.val() && data.val().name) {
          yield put(UserAuthActions.setUserData({ isConfigured: true }));
        }

        if (data.val() && data.val().waterConsumption) {
          yield put(UserAuthActions.initializeWaterConsumption(data.val().waterConsumption));
        }

        const isConfigured = yield select(selectIsConfigured);
        const { locationBeforeTransitions: { pathname } } = yield select(selectLocationState());

        if (pathname !== '/login' && !isConfigured) {
          yield put(replace('/login'));
        }
        if (pathname === '/login' && isConfigured) {
          yield put(replace('/'));
        }
      }
    }
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* resetWaterConsumption() {
  try {
    yield put(SyncActions.syncResetWaterConsumption());
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

function* drinkWater({ value }) {
  try {
    yield put(SyncActions.syncWaterConsumption(value));
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}

export default function* watchUserAuth() {
  try {
    yield all([
      takeLatest(UserAuthTypes.SIGN_IN_ANONYMOUSLY, signInAnonymously),
      takeLatest(UserAuthTypes.SIGN_OUT, signOutFromFirebase),
      takeLatest(UserAuthTypes.SETUP_USER, signOutFromFirebase),
      takeLatest(UserAuthTypes.DRINK_WATER, drinkWater),
      takeLatest(UserAuthTypes.RESET_WATER_CONSUMPTION, resetWaterConsumption),
      takeLatest(StartupTypes.STARTUP, listenForFirebaseAuth),
    ]);
  } catch (error) {
    /* istanbul ignore next */
    reportError(error);
  }
}
