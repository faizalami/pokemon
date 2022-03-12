import { configureStore } from '@reduxjs/toolkit';
import pokemons from './pokemons/pokemons.reducer';
import myPokemons from './my-pokemons/my-pokemons.reducer';

const reducer = {
  pokemons,
  myPokemons,
};

const store = configureStore({
  reducer,
});

export default store;
