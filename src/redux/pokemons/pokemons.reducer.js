import { createSlice } from '@reduxjs/toolkit';
import { getAllPokemons, getPokemonDetail } from './pokemons.actions';

export const initialState = {
  current_offset: 0,
  loading: false,
  data: [],
  detail: null,
};

const setLoading = state => ({
  ...state,
  loading: true,
});

const pokemonsSlice = createSlice({
  name: 'pasien',
  initialState,
  extraReducers: {
    [getAllPokemons.pending]: setLoading,
    [getAllPokemons.fulfilled]: (state, action) => {
      const { current_offset, data, error } = action.payload;

      return {
        ...state,
        current_offset,
        data: [...state.data, ...data],
        error,
        loading: false,
      };
    },
    [getPokemonDetail.pending]: setLoading,
    [getPokemonDetail.fulfilled]: (state, action) => {
      const { detail, error } = action.payload;

      return {
        ...state,
        detail: { ...detail },
        error,
        loading: false,
      };
    },
  },
});

const { reducer: pokemons } = pokemonsSlice;
export default pokemons;
