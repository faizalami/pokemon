import { configureStore } from '@reduxjs/toolkit';
import myPokemons, { deletePokemon, initialState, resetPokemonCatch, storeCaughtPokemon } from './my-pokemons.reducer';
import { catchPokemon } from './my-pokemons.actions';
import {
  selectCatchError,
  selectCatchFailed,
  selectCaughtPokemon, selectMyPokemonById,
  selectMyPokemonData,
  selectMyPokemons, selectMyPokemonTotalEachId,
} from './my-pokemons.selectors';

const reducer = {
  myPokemons,
};

const spyRandom = jest.spyOn(Math, 'random');

describe('Test My Pokemon (Catch and Store Pokemon)', () => {
  test('catch a pokemon success', async () => {
    const pokemon = {
      id: 1,
      name: 'Pikachu',
    };

    // Math random below the threshold (0.5)
    spyRandom.mockImplementation(() => 0.1);

    const store = configureStore({
      reducer,
    });

    await store.dispatch(catchPokemon(pokemon));

    expect(selectCaughtPokemon(store.getState())).toEqual(pokemon);
  });

  test('catch a pokemon failed', async () => {
    const pokemon = {
      id: 1,
      name: 'Pikachu',
    };

    // Math random above the threshold (0.5)
    spyRandom.mockImplementation(() => 0.6);

    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          caught: null,
        },
      },
    });

    await store.dispatch(catchPokemon(pokemon));

    expect(selectCaughtPokemon(store.getState())).toBeNull();
    expect(selectCatchFailed(store.getState())).toBe(true);
  });

  test('store a caught pokemon with a valid name', async () => {
    spyRandom.mockRestore();
    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          data: [],
          caught: {
            id: 1,
            name: 'Pikachu',
          },
        },
      },
    });

    await store.dispatch(storeCaughtPokemon('Joni'));

    expect(selectMyPokemonData(store.getState()).length).toBe(1);
    expect(selectMyPokemonById(store.getState(), 1).length).toBe(1);
  });

  test('store a caught pokemon with a duplicate name', async () => {
    spyRandom.mockRestore();
    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          data: [
            {
              id: 1,
              nickname_id: 1,
              name: 'Pikachu',
              nickname: 'Joni',
            },
          ],
          caught: {
            id: 1,
            name: 'Pikachu',
          },
        },
      },
    });

    await store.dispatch(storeCaughtPokemon('Joni'));

    expect(selectMyPokemonData(store.getState()).length).toBe(1);
    expect(selectCatchError(store.getState())).toBe(true);
  });

  test('store a caught pokemon with no name', () => {
    spyRandom.mockRestore();
    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          data: [],
          caught: {
            id: 1,
            name: 'Pikachu',
          },
        },
      },
    });

    store.dispatch(storeCaughtPokemon(''));

    expect(selectMyPokemonData(store.getState()).length).toBe(0);
  });

  test('reset store (because I use redux-persist)', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          data: [],
          caught: {},
          error: true,
          loading: true,
          failed: true,
        },
      },
    });

    store.dispatch(resetPokemonCatch());

    const { data: initialData, ...stateToBeReset } = initialState;
    const { data, ...state } = selectMyPokemons(store.getState());
    expect(state).toEqual(stateToBeReset);
  });

  test('delete my pokemon', () => {
    const myPokemonData = Array(10).fill().map((item, index) => ({
      nickname_id: index + 1,
    }));
    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          data: [...myPokemonData],
        },
      },
    });

    store.dispatch(deletePokemon(5));

    expect(selectMyPokemonData(store.getState()).length).toBe(myPokemonData.length - 1);
  });

  test('select pokemon total each id', () => {
    const myPokemonData = Array(10).fill().map((item, index) => ({
      id: index % 3 + 1,
      nickname_id: index + 1,
    }));
    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          data: [...myPokemonData],
        },
      },
    });

    const totalEachId = selectMyPokemonTotalEachId(store.getState())

    expect(totalEachId[1]).toEqual(4);
    expect(totalEachId[2]).toEqual(3);
    expect(totalEachId[3]).toEqual(3);
  })
});
