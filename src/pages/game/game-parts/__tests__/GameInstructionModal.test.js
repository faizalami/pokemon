import { fireEvent, render, screen } from '@testing-library/react';
import GameInstructionModal from '../GameInstructionModal';

describe('Test Game Instruction Modal', () => {
  test('matches snapshot', () => {
    expect(render(<GameInstructionModal/>)).toMatchSnapshot();
  });

  test('close modal', () => {
    render(<GameInstructionModal/>);

    fireEvent.click(screen.getByText('Okay （＞ω＜）'))

    expect(screen.queryByText('How to Play???')).not.toBeInTheDocument();
  })
});
