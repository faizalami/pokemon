import { render } from '@testing-library/react';
import PageHeader from '../PageHeader';

test('PageHeader matches snapshot', () => {
  expect(render(<PageHeader>test</PageHeader>)).toMatchSnapshot();
});
