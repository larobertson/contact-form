import { render, screen } from '@testing-library/react';
import Contact from './App';

test('renders learn react link', () => {
  render(<Contact />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
