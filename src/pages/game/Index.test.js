import { setupServer } from 'msw/node';
import { graphql } from 'msw';
import pokemons from '../../redux/pokemons/pokemons.reducer';
import myPokemons from '../../redux/my-pokemons/my-pokemons.reducer';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import GameIndex from './Index';

const dummyPokemons = Array(20).fill().map((item, index) => ({
  id: index + 1,
  name: `Pokemon ${index + 1}`,
  species: {
    color: {
      name: 'white',
    },
  },
}));

const server = setupServer(
  graphql.query('getAllPokemons', (req, res, ctx) => {
    return res(ctx.data({
      pokemons: [...dummyPokemons],
    }));
  }),
);

const reducer = {
  pokemons,
  myPokemons,
};

test('load pokemons', async () => {
  const store = configureStore({
    reducer,
  });
  render(
    <Provider store={store}>
      <GameIndex/>
    </Provider>,
  );

  const pokemonTracks = await screen.findAllByTestId('pokemon-track');
  expect(pokemonTracks.length).toBe(4);
});

