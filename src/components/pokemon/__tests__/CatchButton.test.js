import { render } from '@testing-library/react';
import CatchButton from '../CatchButton';

test('Catch Button matches snapshot', () => {
  expect(render(<CatchButton/>)).toMatchSnapshot();
});
