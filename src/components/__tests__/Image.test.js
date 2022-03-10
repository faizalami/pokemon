import { render, screen } from '@testing-library/react';
import Image from '../Image';

describe('Test Image Component', () => {
  test('complete props', () => {
    render(<Image png="test.png" webp="test.webp" alt="test" lazy/>);
    const imageReg = screen.getByTestId('image-regular');
    const imagePng = screen.queryByTestId('image-png');
    const imageWebp = screen.queryByTestId('image-webp');

    expect(imageReg.src).toMatch(/test.png$/);
    expect(imageReg.getAttribute('loading')).toBe('lazy');
    expect(imagePng).toBeInTheDocument();
    expect(imageWebp).toBeInTheDocument();
  });

  test('png only', () => {
    render(<Image png="test.png" alt="test"/>);
    const imageReg = screen.getByTestId('image-regular');
    const imagePng = screen.queryByTestId('image-png');
    const imageWebp = screen.queryByTestId('image-webp');

    expect(imageReg.src).toMatch(/test.png$/);
    expect(imageReg.getAttribute('loading')).toBe('eager');
    expect(imagePng).toBeInTheDocument();
    expect(imageWebp).not.toBeInTheDocument();
  });

  test('webp only', () => {
    render(<Image webp="test.webp" alt="test"/>);
    const imageReg = screen.getByTestId('image-regular');
    const imagePng = screen.queryByTestId('image-png');
    const imageWebp = screen.queryByTestId('image-webp');

    expect(imageReg.src).toMatch(/test.webp$/);
    expect(imagePng).not.toBeInTheDocument();
    expect(imageWebp).toBeInTheDocument();
  });

  test('using src', () => {
    render(<Image src="test.jpg" alt="test"/>);
    const imageReg = screen.getByTestId('image-regular');
    const imagePng = screen.queryByTestId('image-png');
    const imageWebp = screen.queryByTestId('image-webp');

    expect(imageReg.src).toMatch(/test.jpg$/);
    expect(imagePng).not.toBeInTheDocument();
    expect(imageWebp).not.toBeInTheDocument();
  });
});
