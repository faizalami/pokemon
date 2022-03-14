import { render, screen } from '@testing-library/react';
import ReleaseConfirmModal from '../ReleaseConfirmModal';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Test Release (Delete My Pokemon) Confirm Modal', () => {
  test('modal open (fill pokemon props)', () => {
    const pokemon = {
      nickname_id: 1,
      nickname: 'Jono',
    };
    render(<ReleaseConfirmModal pokemon={pokemon}/>);
    expect(screen.getByText(/Jono/)).toBeInTheDocument();
  });

  test('modal closed', () => {
    render(<ReleaseConfirmModal/>);
    const yesButton = screen.queryByText('Yes');
    expect(yesButton).toBeNull();
  });
});
