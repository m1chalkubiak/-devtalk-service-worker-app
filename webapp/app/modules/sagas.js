import { all, fork } from 'redux-saga/effects';
import watchUserAuth from './userAuth/userAuth.sagas';
import watchUsers from './users/users.sagas';
import watchSync from './sync/sync.sagas';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    fork(watchUserAuth),
    fork(watchUsers),
    fork(watchSync),
    //<-- INJECT MODULE SAGA -->
  ]);
}
