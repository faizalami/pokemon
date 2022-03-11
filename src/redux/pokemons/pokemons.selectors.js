import { createSelector } from '@reduxjs/toolkit';

export const selectPokemons = state => state.pokemons;

export const selectPokemonData = createSelector(
  [selectPokemons],
  pokemons => pokemons.data,
);
