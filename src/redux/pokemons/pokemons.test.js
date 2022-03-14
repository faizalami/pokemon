import { setupServer } from 'msw/node';
import { graphql } from 'msw';
import pokemons from './pokemons.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { getAllPokemons, getPokemonDetail } from './pokemons.actions';
import { selectCurrentOffset, selectError, selectPokemonData, selectPokemonDetail } from './pokemons.selectors';

const dummyPokemons = Array(10).fill().map((item, index) => ({
  id: index + 1,
  name: `Pokemon ${index + 1}`,
  species: {
    color: {
      name: 'white',
    },
  },
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
  graphql.query('getAllPokemons', (req, res, ctx) => {
    return res(ctx.data({
      pokemons: [...dummyPokemons],
    }));
  }),
  graphql.query('getPokemonDetail', (req, res, ctx) => {
    return res(ctx.data({
      pokemon: [dummyDetail],
    }));
  }),
);

const reducer = {
  pokemons,
};

describe('Integration Test Pokemon Slice', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  test('load pokemons list success', async () => {
    const store = configureStore({
      reducer,
    });

    await store.dispatch(getAllPokemons({ limit: 10, offset: 0 }));

    expect(selectPokemonData(store.getState())).toEqual(dummyPokemons);
    expect(selectCurrentOffset(store.getState())).toEqual(0);
  });

  test('load pokemons list failed', async () => {
    server.use(graphql.query('getAllPokemons', (req, res, ctx) => {
      console.info('masuk error');
      return res(ctx.errors([{ message: 'Error!' }]));
    }));
    const store = configureStore({
      reducer,
      preloadedState: {
        pokemons: {
          data: [],
          error: false,
        },
      },
    });

    await store.dispatch(getAllPokemons({ limit: 0, offset: 0 }));

    expect(selectPokemonData(store.getState()).length).toBe(0);
    expect(selectError(store.getState())).toBe(true);
  });

  test('load detail success', async () => {
    const store = configureStore({
      reducer,
    });

    await store.dispatch(getPokemonDetail('ivysaur'));

    expect(selectPokemonDetail(store.getState())).toEqual(dummyDetail);
  });

  test('load detail failed error', async () => {
    server.use(graphql.query('getPokemonDetail', (req, res, ctx) => {
      return res(ctx.errors([{ message: 'Error!' }]));
    }));
    const store = configureStore({
      reducer,
      preloadedState: {
        pokemons: {
          detail: null,
          error: false,
        },
      },
    });

    await store.dispatch(getPokemonDetail('joni'));

    expect(selectPokemonDetail(store.getState())).toBeNull();
    expect(selectError(store.getState())).toBe(true);
  });

  test('load detail failed no data', async () => {
    server.use(graphql.query('getPokemonDetail', (req, res, ctx) => {
      return res(ctx.data({ pokemon: [] }));
    }));
    const store = configureStore({
      reducer,
      preloadedState: {
        pokemons: {
          detail: null,
          error: false,
        },
      },
    });

    await store.dispatch(getPokemonDetail('joni'));

    expect(selectPokemonDetail(store.getState())).toBeNull();
    expect(selectError(store.getState())).toBe(true);
  });
});
