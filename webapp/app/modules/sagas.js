import { all, fork } from 'redux-saga/effects';
import watchUserAuth from './userAuth/userAuth.sagas';
import watchUsers from './users/users.sagas';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    fork(watchUserAuth),
    fork(watchUsers),
    //<-- INJECT MODULE SAGA -->
  ]);
}
