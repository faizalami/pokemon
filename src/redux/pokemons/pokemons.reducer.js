import { createSlice } from '@reduxjs/toolkit';
import { getAllPokemons } from './pokemons.actions';

export const initialState = {
  current_offset: 0,
  loading: false,
  data: [],
  detail: null,
};

const pokemonsSlice = createSlice({
  name: 'pasien',
  initialState,
  extraReducers: {
    [getAllPokemons.pending]: state => ({
      ...state,
      loading: true,
    }),
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
  },
});

const { reducer: pokemons } = pokemonsSlice;
export default pokemons;
