import { createSelector } from 'reselect';

export const selectLoaderDomain = state => state.get('loader');

export const selectIsDataLoaded = createSelector(
  selectLoaderDomain,
  (state) => state.get('dataLoaded', true),
);
