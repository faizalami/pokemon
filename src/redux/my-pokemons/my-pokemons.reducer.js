import { createSlice } from '@reduxjs/toolkit';
import { catchPokemon } from './my-pokemons.actions';

export const initialState = {
  loading: false,
  data: [],
  caught: null,
  failed: false,
};

const myPokemonsSlice = createSlice({
  name: 'my-pokemons',
  initialState,
  extraReducers: {
    [catchPokemon.pending]: state => {
      state.failed = false;
      state.caught = null;
      state.loading = true;
    },
    [catchPokemon.fulfilled]: (state, action) => {
      const { success, pokemon } = action.payload;

      state.failed = !success;
      state.caught = pokemon;
      state.loading = false;
    },
  },
});

const { reducer: myPokemons } = myPokemonsSlice;
export default myPokemons;
