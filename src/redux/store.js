import { configureStore } from '@reduxjs/toolkit';
import pokemons from './pokemons/pokemons.reducer';

const reducer = {
  pokemons,
};

const store = configureStore({
  reducer: reducer,
});

export default store;
