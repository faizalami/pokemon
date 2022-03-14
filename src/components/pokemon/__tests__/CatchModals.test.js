import { render, screen } from '@testing-library/react';
import CatchModals from '../CatchModals';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

describe('Test Catch Modals (Modals to handle catch activities)', () => {
  test('show loading', () => {
    render(<CatchModals loading={true}/>);

    expect(screen.getByText('Catching Pokemon . . .')).toBeInTheDocument();
  });

  test('show failed modal', () => {
    render(<CatchModals failed={true}/>);

    expect(screen.getByText('OH Noooo, Pokemon escaped ! ! !')).toBeInTheDocument();
  });

  test('show success modal', () => {
    const pokemon = {
      id: 1,
      name: 'pikachu',
    };
    render(<CatchModals pokemon={pokemon}/>);

    expect(screen.getByText(/give it a name !$/)).toBeInTheDocument();
  });
});
