import { render, screen } from '@testing-library/react';
import App from './App';

test('renders service platform sign in screen', () => {
  render(<App />);
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});
