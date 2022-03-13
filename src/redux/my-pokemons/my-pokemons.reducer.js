import { createSlice } from '@reduxjs/toolkit';
import { catchPokemon } from './my-pokemons.actions';

export const initialState = {
  loading: false,
  data: [],
  caught: null,
  failed: false,
  error: false,
};

const myPokemonsSlice = createSlice({
  name: 'my-pokemons',
  initialState,
  reducers: {
    storeCaughtPokemon (state, action) {
      const nameExist = state.data.some(pokemon => {
        return pokemon.nickname.toLowerCase() === action.payload.toLowerCase();
      });
      if (nameExist) {
        state.error = true;
      }
      if (state.caught && !nameExist) {
        const id = state.data.length + 1;
        const namedPokemon = {
          ...state.caught,
          nickname_id: id,
          nickname: action.payload,
        };
        state.data.push(namedPokemon);
        state.caught = null;
        state.error = false;
      }
    },
    resetPokemonCatch (state) {
      state.caught = null;
      state.loading = false;
      state.error = false;
      state.failed = false;
    },
    deletePokemon (state, action) {
      state.data = state.data.filter(pokemon => pokemon.nickname_id !== action.payload);
    },
  },
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

const { actions, reducer: myPokemons } = myPokemonsSlice;
export const {
  storeCaughtPokemon,
  resetPokemonCatch,
  deletePokemon,
} = actions;
export default myPokemons;
