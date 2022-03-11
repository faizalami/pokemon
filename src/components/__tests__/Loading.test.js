import { render } from '@testing-library/react';
import Loading from '../Loading';

test('Loading matches snapshot', () => {
  expect(render(<Loading/>)).toMatchSnapshot();
});
