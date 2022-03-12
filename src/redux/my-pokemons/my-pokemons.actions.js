import { createAsyncThunk } from '@reduxjs/toolkit';

export const catchPokemon = createAsyncThunk(
  'my-pokemons/catch',
  async (pokemon) => {
    return await new Promise(resolve => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          resolve({
            success: true,
            pokemon,
          });
        } else {
          resolve({
            success: false,
            pokemon: null,
          });
        }
      }, 3000);
    });
  },
);
