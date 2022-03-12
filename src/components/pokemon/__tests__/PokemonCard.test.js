import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonCard from '../PokemonCard';
import myPokemons from '../../../redux/my-pokemons/my-pokemons.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const reducer = {
  myPokemons,
};

const store = configureStore({
  reducer,
});

describe('Test Pokemon Card', () => {
  test('PokemonCard matches snapshot', () => {
    const dummy = {
      id: 1,
      name: 'bulbasaur',
    };

    expect(render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonCard {...dummy} />
        </MemoryRouter>
      </Provider>,
    )).toMatchSnapshot();
  });

  test('using nickname', () => {
    const dummy = {
      id: 1,
      name: 'bulbasaur',
      nickname: 'test',
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonCard {...dummy} />
        </MemoryRouter>
      </Provider>,
    );

    const displayName = screen.getByText(dummy.nickname);
    const realName = screen.queryByText(dummy.name);
    expect(displayName.tagName).toBe('H2');
    expect(realName).toBeInTheDocument();
  });
});
