import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Index from '../Index';

jest.mock('react-redux', () => ({
  useSelector: () => ({}),
  useDispatch: () => jest.fn(),
}));

const dummyPokemons = Array(10).fill().map((item, index) => ({
  id: index + 1,
  name: `Pokemon ${index + 1}`,
  species: {
    color: {
      name: 'white',
    },
  },
}));

describe('Test Index Component', () => {
  test('show data', () => {
    render(
      <MemoryRouter>
        <Index data={dummyPokemons}/>
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/^Pokemon/).length).toBe(dummyPokemons.length);
  });

  test('show loading', () => {
    render(
      <MemoryRouter>
        <Index data={[]} loading={true}/>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
