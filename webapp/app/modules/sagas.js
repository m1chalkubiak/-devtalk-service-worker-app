import { all, fork } from 'redux-saga/effects';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    //<-- INJECT MODULE SAGA -->
  ]);
}
