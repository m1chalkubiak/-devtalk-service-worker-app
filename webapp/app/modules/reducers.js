import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import { reducer as routerReducer } from './router/router.redux';
import { reducer as localesReducer } from './locales/locales.redux';
import { reducer as userAuthReducer } from './userAuth/userAuth.redux';
import { reducer as usersReducer } from './users/users.redux';
import { reducer as loaderReducer } from './loader/loader.redux';
//<-- IMPORT MODULE REDUCER -->

export default function createReducer() {
  return combineReducers({
    form: formReducer,
    route: routerReducer,
    locales: localesReducer,
    userAuth: userAuthReducer,
    users: usersReducer,
    loader: loaderReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
