import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonCard from '../PokemonCard';

describe('Test Pokemon Card', () => {
  test('PokemonCard matches snapshot', () => {
    const dummy = {
      id: 1,
      name: 'bulbasaur',
    };

    expect(render(
      <MemoryRouter>
        <PokemonCard {...dummy} />
      </MemoryRouter>,
    )).toMatchSnapshot();
  });

  test('using nickname', () => {
    const dummy = {
      id: 1,
      name: 'bulbasaur',
      nickname: 'test',
    };

    render(
      <MemoryRouter>
        <PokemonCard {...dummy} />
      </MemoryRouter>,
    );

    const displayName = screen.getByText(dummy.nickname);
    const realName = screen.queryByText(dummy.name);
    expect(displayName.tagName).toBe('H2');
    expect(realName).toBeInTheDocument();
  });
});
