import { render } from '@testing-library/react';
import CatchingModal from '../CatchingModal';

test('catching modal matches snapshot', () => {
  expect(render(<CatchingModal/>)).toMatchSnapshot();
});
