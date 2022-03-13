import { createSelector } from '@reduxjs/toolkit';

export const selectMyPokemons = state => state.myPokemons;
export const selectCatchLoading = state => state.myPokemons.loading;
export const selectCatchFailed = state => state.myPokemons.failed;
export const selectCatchError = state => state.myPokemons.error;

export const selectCaughtPokemon = createSelector(
  [selectMyPokemons],
  myPokemons => myPokemons.caught,
);

export const selectMyPokemonData = createSelector(
  [selectMyPokemons],
  myPokemons => myPokemons.data,
);

export const selectMyPokemonTotalEachId = createSelector(
  [selectMyPokemonData],
  data => data.reduce((totals, pokemon) => {
    return {
      ...totals,
      [pokemon.id]: totals[pokemon.id] ? totals[pokemon.id] + 1 : 1,
    };
  }, {}),
);

export const selectMyPokemonById = createSelector(
  [
    selectMyPokemonData,
    (state, id) => id,
  ],
  (data, id) => data.filter(pokemon => pokemon.id === id),
);
