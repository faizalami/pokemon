import myPokemons from '../../../redux/my-pokemons/my-pokemons.reducer';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import MyPokemonIndex from '../MyPokemonIndex';

jest.mock('react-helmet-async', () => ({
  Helmet: () => null,
}));

const dummyPokemons = Array(10).fill().map((item, index) => ({
  id: index % 3 + 1,
  name: `Pokemon ${index % 3 + 1}`,
  nickname_id: index + 1,
  nickname: `My Pokemon ${index + 1}`,
}));

const reducer = {
  myPokemons,
};

describe('Test My Pokemon Page', () => {
  test('load all', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          data: [...dummyPokemons],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyPokemonIndex/>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText(/^My Pokemon/).length).toBe(dummyPokemons.length);
  });

  test('load no data', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        myPokemons: {
          data: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyPokemonIndex/>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('I don\'t have pokemon (ㄒoㄒ)')).toBeInTheDocument();
  });
});
