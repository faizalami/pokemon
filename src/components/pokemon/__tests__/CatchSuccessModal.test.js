import { selectCatchError } from '../../../redux/my-pokemons/my-pokemons.selectors';
import { storeCaughtPokemon } from '../../../redux/my-pokemons/my-pokemons.reducer';
import { fireEvent, render, screen } from '@testing-library/react';
import CatchSuccessModal from '../CatchSuccessModal';
import { useSelector } from 'react-redux';

jest.mock('../../../redux/my-pokemons/my-pokemons.selectors', () => ({
  selectCatchError: jest.fn(),
}));

jest.mock('../../../redux/my-pokemons/my-pokemons.reducer', () => ({
  storeCaughtPokemon: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

describe('Test Catch Success Modal', () => {
  const pokemon = {
    id: 1,
    name: 'pikachu',
  };

  test('set correct name', () => {
    selectCatchError.mockImplementation(() => false);

    render(<CatchSuccessModal pokemon={pokemon}/>);

    fireEvent.change(screen.getByLabelText('Pokemon Name'), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByText('Save'));

    expect(storeCaughtPokemon).toBeCalledWith('test');
  });

  test('enter duplicate name', () => {
    selectCatchError.mockImplementation(() => true);
    useSelector.mockImplementation(selector => selector);

    render(<CatchSuccessModal pokemon={pokemon}/>);

    fireEvent.change(screen.getByLabelText('Pokemon Name'), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Name already exist, try different name!')).toBeInTheDocument();
  })

  test('leave name blank', () => {
    render(<CatchSuccessModal pokemon={pokemon}/>);

    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Please enter a name.')).toBeInTheDocument();
  })
});
