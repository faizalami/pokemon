import { createAsyncThunk } from '@reduxjs/toolkit';
import gqlClient from '../../graphql/gqlClient';
import { GET_ALL_POKEMONS } from '../../graphql/queries';

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
        data: data.pokemon,
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
