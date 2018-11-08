import { createActions, createReducer } from 'reduxsauce';
import { Record } from 'immutable';

export const { Types: LoaderTypes, Creators: LoaderActions } = createActions({
  setDataLoaded: null,
  setDataLoading: null,
}, { prefix: 'LOADER_' });

const LoaderRecord = new Record({
  dataLoaded: false,
});

export const INITIAL_STATE = new LoaderRecord({});

const setDataLoaded = (state) => state.set('dataLoaded', true);

const setDataLoading = (state) => state.set('dataLoaded', false);

export const reducer = createReducer(INITIAL_STATE, {
  [LoaderTypes.SET_DATA_LOADED]: setDataLoaded,
  [LoaderTypes.SET_DATA_LOADING]: setDataLoading,
});
