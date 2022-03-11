import { createSelector } from '@reduxjs/toolkit';

export const selectPokemons = state => state.pokemons;
export const selectLoading = state => state.pokemons.loading;
export const selectCurrentOffset = state => state.pokemons.current_offset;

export const selectPokemonData = createSelector(
  [selectPokemons],
  pokemons => pokemons.data,
);

export const selectPokemonDetail = createSelector(
  [selectPokemons],
  pokemons => pokemons.detail,
);
