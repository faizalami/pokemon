import { createAsyncThunk } from '@reduxjs/toolkit';
import gqlClient from '../../graphql/gqlClient';
import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL } from '../../graphql/queries';

export const getAllPokemons = createAsyncThunk(
  'pokemons/getAll',
  async ({ limit, offset }) => {
    try {
      const { data } = await gqlClient.query({
        query: GET_ALL_POKEMONS,
        variables: { limit, offset },
      });

      return {
        current_offset: offset,
        data: data.pokemons,
        error: false,
      };
    } catch (error) {
      return {
        current_offset: offset,
        data: [],
        error: true,
      };
    }
  },
);

export const getPokemonDetail = createAsyncThunk(
  'pokemons/detail',
  async (name) => {
    try {
      const { data } = await gqlClient.query({
        query: GET_POKEMON_DETAIL,
        variables: { name },
      });

      return {
        detail: data.pokemon?.[0] || null,
        error: !data.pokemon.length,
      };
    } catch (error) {
      return {
        detail: null,
        error: true,
      };
    }
  },
);
