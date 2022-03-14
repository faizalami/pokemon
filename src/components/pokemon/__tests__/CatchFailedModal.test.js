import { render } from '@testing-library/react';
import CatchFailedModal from '../CatchFailedModal';

test('catch failed modal matches snapshot', () => {
  expect(render(<CatchFailedModal/>)).toMatchSnapshot();
});
