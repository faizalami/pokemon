import { createSelector } from '@reduxjs/toolkit';

export const selectPokemons = state => state.pokemons;
export const selectPokemonsLoading = state => state.pokemons.loading;

export const selectPokemonData = createSelector(
  [selectPokemons],
  pokemons => pokemons.data,
);

export const selectPokemonDetail = createSelector(
  [selectPokemons],
  pokemons => pokemons.detail,
);
