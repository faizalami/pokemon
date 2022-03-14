import { render } from '@testing-library/react';
import BaseModal from '../BaseModal';

test('base modal matches snapshot', () => {
  expect(render(<BaseModal>Test Modal</BaseModal>)).toMatchSnapshot();
});
