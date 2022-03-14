import { render } from '@testing-library/react';
import ErrorPage from './ErrorPage';

test('Error page matches snapshot', () => {
  expect(render(<ErrorPage code={404} message="Not Found"/>)).toMatchSnapshot();
});
