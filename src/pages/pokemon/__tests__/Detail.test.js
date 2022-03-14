import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { graphql } from 'msw';
import pokemons from '../../../redux/pokemons/pokemons.reducer';
import myPokemons from '../../../redux/my-pokemons/my-pokemons.reducer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Detail from '../Detail';
import { selectCaughtPokemon } from '../../../redux/my-pokemons/my-pokemons.selectors';

jest.mock('react-helmet-async', () => ({
  Helmet: () => null,
}));

jest.mock('react-chartjs-2', () => ({
  Radar: () => null,
}));

const dummyDetail = {
  id: 2,
  name: 'ivysaur',
  height: 10,
  weight: 130,
  species: {
    name: 'ivysaur',
    color: {
      name: 'green',
    },
    generation: {
      name: 'generation-i',
    },
    shape: {
      name: 'quadruped',
    },
    habitat: {
      name: 'grassland',
    },
  },
  stats: [],
  types: [],
  moves: [],
};

const server = setupServer(
  graphql.query('getPokemonDetail', (req, res, ctx) => {
    return res(ctx.data({
      pokemon: [dummyDetail],
    }));
  }),
);

const reducer = {
  pokemons,
  myPokemons,
};

describe('Test Pokemon Detail', () => {
  test('load a valid detail', async () => {
    const store = configureStore({
      reducer,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/pokemon/${dummyDetail.name}`]}>
          <Routes>
            <Route path="/pokemon/:name" element={<Detail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const detail = await screen.findAllByText(dummyDetail.name);
    expect(detail.length).toBeGreaterThan(1);
  });

  test('detail not found', async () => {
    server.use(graphql.query('getPokemonDetail', (req, res, ctx) => {
      return res(ctx.errors([{ message: 'Error!' }]));
    }));

    const store = configureStore({
      reducer,
      pokemons: {
        detail: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/pokemon/pokemin']}>
          <Routes>
            <Route path="/pokemon/:name" element={<Detail/>}/>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const errorPage = await screen.findByText('404');
    expect(errorPage).toBeInTheDocument();
  });
});
