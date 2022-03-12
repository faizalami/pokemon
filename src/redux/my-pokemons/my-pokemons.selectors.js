import { createSelector } from '@reduxjs/toolkit';

export const selectMyPokemons = state => state.myPokemons;
export const selectCatchLoading = state => state.myPokemons.loading;
export const selectCatchFailed = state => state.myPokemons.failed;

export const selectCaughtPokemon = createSelector(
  [selectMyPokemons],
  myPokemons => myPokemons.caught,
);
