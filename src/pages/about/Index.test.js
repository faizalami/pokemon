import { render } from '@testing-library/react';
import AboutIndex from './Index';

test('About page matches snapshot', () => {
  expect(render(<AboutIndex/>)).toMatchSnapshot();
});
