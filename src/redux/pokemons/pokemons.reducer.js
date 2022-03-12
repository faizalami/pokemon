import { createSlice } from '@reduxjs/toolkit';
import { getAllPokemons, getPokemonDetail } from './pokemons.actions';

export const initialState = {
  current_offset: -1,
  loading: false,
  data: [],
  detail: null,
};

const setLoading = state => ({
  ...state,
  loading: true,
  error: false,
});

const pokemonsSlice = createSlice({
  name: 'pasien',
  initialState,
  extraReducers: {
    [getAllPokemons.pending]: setLoading,
    [getAllPokemons.fulfilled]: (state, action) => {
      const { current_offset, data, error } = action.payload;

      if (state.current_offset < current_offset) {
        state.data = [...state.data, ...data];
        state.current_offset = current_offset;
      }
      state.error = error;
      state.loading = false;
    },
    [getPokemonDetail.pending]: state => {
      setLoading(state);
      state.detail = null;
    },
    [getPokemonDetail.fulfilled]: (state, action) => {
      const { detail, error } = action.payload;

      return {
        ...state,
        detail: detail ? { ...detail } : null,
        error,
        loading: false,
      };
    },
  },
});

const { reducer: pokemons } = pokemonsSlice;
export default pokemons;
