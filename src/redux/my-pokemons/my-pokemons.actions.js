import { createAsyncThunk } from '@reduxjs/toolkit';

const THRESHOLD = 0.5;

export const catchPokemon = createAsyncThunk(
  'my-pokemons/catch',
  async (pokemon) => {
    return await new Promise(resolve => {
      setTimeout(() => {
        if (Math.random() < THRESHOLD) {
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
